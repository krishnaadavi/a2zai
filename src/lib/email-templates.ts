// A2Z AI - Email Templates
// Adapted from MomentumTrader

const STYLES = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f172a; }
  .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; }
  .header { background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); padding: 32px; text-align: center; }
  .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
  .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; }
  .content { padding: 32px; color: #e2e8f0; }
  .story-card { background-color: #334155; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #7c3aed; }
  .story-title { color: white; font-size: 16px; font-weight: 600; margin: 0 0 8px; }
  .story-meta { color: #94a3b8; font-size: 12px; }
  .category-tag { display: inline-block; background-color: rgba(124,58,237,0.2); color: #a78bfa; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 8px; }
  .cta-button { display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0; }
  .footer { padding: 24px; background-color: #0f172a; text-align: center; font-size: 12px; color: #64748b; }
  .footer a { color: #7c3aed; text-decoration: none; }
`;

interface Story {
  title: string;
  source: string;
  category: string;
  readTime: string;
  url?: string;
}

interface Model {
  name: string;
  provider: string;
  trend: string;
}

export function generateDailyDigestHtml(
  stories: Story[],
  models: Model[],
  email?: string
): string {
  const storiesHtml = stories
    .slice(0, 5)
    .map((story, idx) => `
      <div class="story-card">
        <span class="category-tag">${story.category}</span>
        <h3 class="story-title">${idx + 1}. ${story.title}</h3>
        <p class="story-meta">${story.source} • ${story.readTime} read</p>
      </div>
    `)
    .join('');

  const modelsHtml = models
    .slice(0, 3)
    .map(model => `
      <div style="display: inline-block; background-color: #334155; border-radius: 8px; padding: 12px 16px; margin: 4px;">
        <strong style="color: white;">${model.name}</strong>
        <span style="color: #94a3b8; font-size: 12px;"> ${model.provider}</span>
        <span style="color: #22c55e; font-size: 12px; margin-left: 8px;">${model.trend}</span>
      </div>
    `)
    .join('');

  const unsubscribeUrl = email
    ? `https://a2zai.ai/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
    : 'https://a2zai.ai/api/newsletter/unsubscribe';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${STYLES}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧠 A2Z AI Daily</h1>
            <p>Your 5-minute AI briefing</p>
          </div>
          
          <div style="text-align: center; padding: 10px; background: #0f172a; border-bottom: 1px solid #334155;">
            <a href="https://a2zai.ai/updates" style="color: #7c3aed; font-size: 12px; text-decoration: none;">📱 Open in browser for full experience →</a>
          </div>
          
          <div class="content">
            <h2 style="color: white; font-size: 20px; margin-bottom: 16px;">📰 Today's Top 5</h2>
            ${storiesHtml}
            
            <h2 style="color: white; font-size: 20px; margin: 32px 0 16px;">🔥 Trending Models</h2>
            <div style="text-align: center;">
              ${modelsHtml}
            </div>
            
            <div style="text-align: center; margin-top: 32px;">
              <a href="https://a2zai.ai" class="cta-button">Explore More →</a>
            </div>
          </div>
          
          <div class="footer">
            <p>You're receiving this because you subscribed to A2Z AI daily digest.</p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a> | <a href="https://a2zai.ai">Visit Website</a></p>
            <p>© ${new Date().getFullYear()} A2Z AI. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateWelcomeEmailHtml(dailyDigest: boolean, weeklyDigest: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${STYLES}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to A2Z AI!</h1>
            <p>Your subscription is confirmed</p>
          </div>
          
          <div style="text-align: center; padding: 10px; background: #0f172a; border-bottom: 1px solid #334155;">
            <a href="https://a2zai.ai" style="color: #7c3aed; font-size: 12px; text-decoration: none;">📱 Open in browser for full experience →</a>
          </div>
          
          <div class="content">
            <p style="font-size: 18px; color: #e2e8f0; margin-bottom: 24px;">
              Thanks for joining! You're now subscribed to stay AI-current in 5 minutes.
            </p>

            <div style="background-color: #064e3b; border-left: 4px solid #22c55e; padding: 20px; margin-bottom: 24px; border-radius: 6px;">
              <h3 style="margin: 0 0 12px; color: #22c55e;">📬 Your Email Schedule</h3>
              ${dailyDigest ? `
                <p style="margin: 8px 0; color: #22c55e;">
                  <strong>✅ Daily Digest</strong><br>
                  <span style="font-size: 14px; color: #86efac;">Every weekday at 8:00 AM EST - Top 5 AI stories</span>
                </p>
              ` : ''}
              ${weeklyDigest ? `
                <p style="margin: 8px 0; color: #22c55e;">
                  <strong>✅ Weekly Recap</strong><br>
                  <span style="font-size: 14px; color: #86efac;">Every Sunday at 8:00 AM EST - Week in AI summary</span>
                </p>
              ` : ''}
            </div>

            <h3 style="color: white; margin: 24px 0 16px; font-size: 18px;">What You'll Receive</h3>
            
            <div style="margin-bottom: 16px; padding: 12px; background-color: #334155; border-radius: 8px;">
              📰 <strong style="color: white;">Top AI News</strong> - Curated daily headlines
            </div>
            <div style="margin-bottom: 16px; padding: 12px; background-color: #334155; border-radius: 8px;">
              🧠 <strong style="color: white;">Trending Models</strong> - New releases and updates
            </div>
            <div style="margin-bottom: 16px; padding: 12px; background-color: #334155; border-radius: 8px;">
              📊 <strong style="color: white;">Research Highlights</strong> - Latest papers simplified
            </div>
            
            <div style="text-align: center; margin-top: 32px;">
              <a href="https://a2zai.ai" class="cta-button">Explore A2Z AI →</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} A2Z AI. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateDailyDigestSubject(topStory?: string): string {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (topStory) {
    // Truncate at 50 chars
    const truncated = topStory.length > 50 ? topStory.substring(0, 47) + '...' : topStory;
    return `🧠 ${truncated} | AI Daily ${today}`;
  }

  return `🧠 Your AI Briefing | ${today}`;
}
