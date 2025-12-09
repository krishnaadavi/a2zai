import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import {
    generateDailyDigestHtml,
    generateDailyDigestSubject
} from '@/lib/email-templates';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

// Mock data for now - will be replaced with API calls
const mockStories: Story[] = [
    { title: "OpenAI announces GPT-5 with improved reasoning", source: "TechCrunch", category: "Models", readTime: "3 min" },
    { title: "Google DeepMind's Gemini 2.0 achieves new benchmarks", source: "The Verge", category: "Research", readTime: "4 min" },
    { title: "Anthropic releases Claude 3.5 with improved coding", source: "VentureBeat", category: "Models", readTime: "2 min" },
    { title: "Meta open-sources Llama 3.2 90B parameter version", source: "Ars Technica", category: "Open Source", readTime: "5 min" },
    { title: "AI regulation debate heats up in EU parliament", source: "Reuters", category: "Policy", readTime: "4 min" },
];

const mockModels: Model[] = [
    { name: "GPT-4o", provider: "OpenAI", trend: "+12%" },
    { name: "Claude 3.5", provider: "Anthropic", trend: "+8%" },
    { name: "Gemini Pro", provider: "Google", trend: "+5%" },
];

export async function sendDailyDigestToSubscribers() {
    // Get all subscribers with daily digest enabled
    const subscribers = await prisma.newsletterSubscriber.findMany({
        where: {
            dailyDigest: true,
        },
    });

    if (subscribers.length === 0) {
        console.log('No subscribers for daily digest');
        return { sent: 0 };
    }

    // In production, fetch real data from APIs
    const stories = mockStories;
    const models = mockModels;

    const subject = generateDailyDigestSubject(stories[0]?.title);

    // Send emails in batches
    const batchSize = 50;
    let sentCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);

        const emailPromises = batch.map(async (subscriber: { email: string }) => {
            const html = generateDailyDigestHtml(stories, models, subscriber.email);

            if (!resend) {
                console.log(`[Dry run] Would send email to ${subscriber.email}`);
                sentCount++;
                return;
            }

            try {
                await resend.emails.send({
                    from: 'AI on AI <digest@aionai.dev>',
                    to: subscriber.email,
                    subject,
                    html,
                });
                sentCount++;
            } catch (error) {
                console.error(`Failed to send to ${subscriber.email}:`, error);
            }
        });

        await Promise.all(emailPromises);
    }

    console.log(`Daily digest sent to ${sentCount}/${subscribers.length} subscribers`);
    return { sent: sentCount, total: subscribers.length };
}
