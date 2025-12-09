import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { generateWelcomeEmailHtml } from '@/lib/email-templates';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Test email exception for template testing
const TEST_EMAIL = 'krishna.adavi@gmail.com';

export async function POST(request: Request) {
    try {
        const { email, dailyDigest = true, weeklyDigest = false } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { success: false, error: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Check if subscriber already exists
        const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
            where: { email },
        });

        // Test email exception - always send welcome email
        const isTestEmail = email.toLowerCase() === TEST_EMAIL.toLowerCase();

        if (existingSubscriber && !isTestEmail) {
            // Update preferences for existing subscriber
            await prisma.newsletterSubscriber.update({
                where: { email },
                data: { dailyDigest, weeklyDigest },
            });

            return NextResponse.json({
                success: true,
                data: existingSubscriber,
                message: "You're already subscribed! Preferences updated.",
            });
        }

        // Create new subscriber (skip if test email already exists)
        let subscriber = existingSubscriber;
        if (!existingSubscriber) {
            subscriber = await prisma.newsletterSubscriber.create({
                data: {
                    email,
                    dailyDigest,
                    weeklyDigest,
                },
            });
        } else if (isTestEmail) {
            // Update test email preferences
            subscriber = await prisma.newsletterSubscriber.update({
                where: { email },
                data: { dailyDigest, weeklyDigest },
            });
        }

        // Send welcome email
        try {
            const html = generateWelcomeEmailHtml(dailyDigest, weeklyDigest);

            if (resend) {
                await resend.emails.send({
                    from: 'AI on AI <hello@aionai.dev>',
                    to: email,
                    subject: '🧠 Welcome to AI on AI!',
                    html,
                });
                console.log(`Welcome email sent to ${email}`);
            } else {
                console.log(`[Dry run] Would send welcome email to ${email}`);
            }
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail the subscription if email fails
        }

        return NextResponse.json({
            success: true,
            data: subscriber,
            message: isTestEmail ? 'Test email sent!' : 'Successfully subscribed!',
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to subscribe' },
            { status: 500 }
        );
    }
}
