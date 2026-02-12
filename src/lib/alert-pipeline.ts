import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { buildLiveSignals } from '@/lib/signals-service';
import { rankSignalsForUser } from '@/lib/signal-personalization';

type RankedSignal = ReturnType<typeof rankSignalsForUser>['data'][number];

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function getAlertDefaults() {
  return {
    emailDailyBrief: true,
    emailWeeklyBrief: true,
    emailInstantAlerts: false,
    inAppAlerts: true,
    fundingAlerts: true,
    modelReleaseAlerts: true,
    companyNewsAlerts: true,
  };
}

function isSignalAllowedByPreferences(
  signal: RankedSignal,
  prefs: ReturnType<typeof getAlertDefaults>
): boolean {
  if (signal.eventType === 'funding') return prefs.fundingAlerts;
  if (signal.eventType === 'model_release') return prefs.modelReleaseAlerts;
  if (signal.eventType === 'news') return prefs.companyNewsAlerts;
  return true;
}

function buildEmailHtml(args: {
  userName?: string | null;
  title: string;
  intro: string;
  signals: RankedSignal[];
}): string {
  const rows = args.signals
    .map((signal) => {
      const reasons = signal.personalizationScore.reasons.slice(0, 2).join(' • ');
      return `
        <li style="margin-bottom:12px;">
          <a href="${signal.url}" style="color:#7dd3fc;text-decoration:none;font-weight:600;">
            ${signal.title}
          </a>
          <div style="color:#94a3b8;font-size:12px;margin-top:4px;">
            ${signal.source} • ${signal.entityName}
          </div>
          <div style="color:#a78bfa;font-size:12px;margin-top:4px;">
            ${reasons || 'Matched your personalized profile'}
          </div>
        </li>
      `;
    })
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#020617;color:#e2e8f0;padding:24px;">
      <h2 style="margin:0 0 8px 0;color:#fff;">${args.title}</h2>
      <p style="margin:0 0 16px 0;color:#94a3b8;">${args.intro}</p>
      <ul style="padding-left:18px;margin:0;">${rows}</ul>
      <p style="margin-top:18px;color:#64748b;font-size:12px;">
        You can manage alerts in your personalization settings.
      </p>
    </div>
  `;
}

async function sendEmailIfConfigured(input: {
  email: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!resend) {
    console.log(`[Dry run] Would send alert email to ${input.email}`);
    return true;
  }

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await resend.emails.send({
        from: 'A2Z AI <alerts@a2zai.ai>',
        to: input.email,
        subject: input.subject,
        html: input.html,
      });
      return true;
    } catch (error) {
      const isLast = attempt === maxAttempts;
      console.error(
        `Failed sending alert email to ${input.email} (attempt ${attempt}/${maxAttempts})`,
        error
      );
      if (isLast) return false;
      await new Promise((resolve) => setTimeout(resolve, attempt * 400));
    }
  }

  return false;
}

export async function runPersonalizedAlertPipeline(options?: {
  maxUsers?: number;
  threshold?: number;
}): Promise<{
  processedUsers: number;
  consideredUsers: number;
  inAppAlertsCreated: number;
  emailInstantSent: number;
  emailDailySent: number;
  candidateSignalsEvaluated: number;
}> {
  const maxUsers = Math.min(Math.max(options?.maxUsers ?? 200, 1), 2000);
  const threshold = options?.threshold ?? 52;
  const todayKey = new Date().toISOString().slice(0, 10);

  const users = await prisma.user.findMany({
    where: {
      watchlistItems: { some: {} },
    },
    include: {
      watchlistItems: { include: { entity: true } },
      preferences: true,
      alertPreference: true,
    },
    take: maxUsers,
    orderBy: { updatedAt: 'desc' },
  });

  const { signals } = await buildLiveSignals(80);
  let processedUsers = 0;
  let inAppAlertsCreated = 0;
  let emailInstantSent = 0;
  let emailDailySent = 0;
  let candidateSignalsEvaluated = 0;

  for (const user of users) {
    if (user.watchlistItems.length === 0) continue;
    const readHistory = await prisma.readHistory.findMany({
      where: { userId: user.id },
      orderBy: { readAt: 'desc' },
      take: 250,
      select: {
        articleType: true,
        readAt: true,
      },
    });

    const ranked = rankSignalsForUser({
      signals,
      watchlistEntities: user.watchlistItems.map((item) => item.entity),
      preferences: user.preferences,
      readHistory,
      limit: 40,
      watchlistOnly: false,
    });

    const prefs = { ...getAlertDefaults(), ...(user.alertPreference || {}) };
    const candidates = ranked.data
      .filter((signal) => signal.personalizationScore.total >= threshold)
      .filter((signal) => signal.watchlistMatch)
      .filter((signal) => isSignalAllowedByPreferences(signal, prefs))
      .slice(0, 8);

    candidateSignalsEvaluated += candidates.length;
    if (candidates.length === 0) {
      processedUsers++;
      continue;
    }

    const signalIds = candidates.map((signal) => signal.id);
    const existingLogs = await prisma.alertDeliveryLog.findMany({
      where: {
        userId: user.id,
        signalId: { in: [...signalIds, `daily-${todayKey}`] },
      },
      select: {
        signalId: true,
        channel: true,
      },
    });
    const sentSet = new Set(existingLogs.map((log) => `${log.channel}:${log.signalId}`));

    if (prefs.inAppAlerts) {
      const inAppTargets = candidates.filter((signal) => !sentSet.has(`in_app:${signal.id}`));

      if (inAppTargets.length > 0) {
        await prisma.inAppAlert.createMany({
          data: inAppTargets.map((signal) => ({
            userId: user.id,
            signalId: signal.id,
            title: signal.title,
            message: signal.personalizationScore.reasons[0] || 'Matched your personalization profile',
            url: signal.url,
            eventType: signal.eventType,
            metadata: {
              score: signal.personalizationScore.total,
              reasons: signal.personalizationScore.reasons,
            },
          })),
          skipDuplicates: true,
        });

        await prisma.alertDeliveryLog.createMany({
          data: inAppTargets.map((signal) => ({
            userId: user.id,
            signalId: signal.id,
            channel: 'in_app',
            metadata: {
              score: signal.personalizationScore.total,
            },
          })),
          skipDuplicates: true,
        });
        inAppAlertsCreated += inAppTargets.length;
      }
    }

    if (prefs.emailInstantAlerts && user.email) {
      const unsentInstant = candidates.filter((signal) => !sentSet.has(`email_instant:${signal.id}`));
      if (unsentInstant.length > 0) {
        const sent = await sendEmailIfConfigured({
          email: user.email,
          subject: `AI Alert: ${unsentInstant.length} new watchlist signals`,
          html: buildEmailHtml({
            userName: user.name,
            title: 'New Personalized AI Alerts',
            intro: 'High-priority signals matched your watchlist and preferences.',
            signals: unsentInstant.slice(0, 5),
          }),
        });

        if (sent) {
          await prisma.alertDeliveryLog.createMany({
            data: unsentInstant.map((signal) => ({
              userId: user.id,
              signalId: signal.id,
              channel: 'email_instant',
              metadata: {
                score: signal.personalizationScore.total,
              },
            })),
            skipDuplicates: true,
          });
          emailInstantSent += 1;
        }
      }
    }

    if (prefs.emailDailyBrief && user.email && !sentSet.has(`email_daily:daily-${todayKey}`)) {
      const sent = await sendEmailIfConfigured({
        email: user.email,
        subject: 'Your daily personalized AI brief',
        html: buildEmailHtml({
          userName: user.name,
          title: 'Daily Personalized AI Brief',
          intro: 'Top watchlist-matched intelligence from the last cycle.',
          signals: candidates.slice(0, 5),
        }),
      });

      if (sent) {
        await prisma.alertDeliveryLog.create({
          data: {
            userId: user.id,
            signalId: `daily-${todayKey}`,
            channel: 'email_daily',
            metadata: {
              signalCount: Math.min(candidates.length, 5),
            },
          },
        });
        emailDailySent += 1;
      }
    }

    processedUsers++;
  }

  return {
    processedUsers,
    consideredUsers: users.length,
    inAppAlertsCreated,
    emailInstantSent,
    emailDailySent,
    candidateSignalsEvaluated,
  };
}
