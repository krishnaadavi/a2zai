import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new NextResponse(
        generateUnsubscribePage('Invalid unsubscribe link', false),
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Find and delete subscriber
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return new NextResponse(
        generateUnsubscribePage('Email not found in our subscriber list', false),
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    await prisma.newsletterSubscriber.delete({
      where: { email },
    });

    return new NextResponse(
      generateUnsubscribePage('You have been successfully unsubscribed', true),
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new NextResponse(
      generateUnsubscribePage('Something went wrong. Please try again.', false),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404 }
      );
    }

    await prisma.newsletterSubscriber.delete({
      where: { email },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

function generateUnsubscribePage(message: string, success: boolean): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Unsubscribe - A2Z AI</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0f172a;
            color: #e2e8f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 400px;
            text-align: center;
            background-color: #1e293b;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          }
          .icon {
            font-size: 48px;
            margin-bottom: 16px;
          }
          h1 {
            margin: 0 0 16px;
            font-size: 24px;
            color: white;
          }
          p {
            margin: 0 0 24px;
            color: #94a3b8;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          }
          .button:hover {
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">${success ? '👋' : '⚠️'}</div>
          <h1>${success ? 'Goodbye!' : 'Oops!'}</h1>
          <p>${message}</p>
          ${success
            ? '<p style="color: #64748b; font-size: 14px;">We\'re sorry to see you go. You can always resubscribe anytime.</p>'
            : ''
          }
          <a href="https://a2zai.ai" class="button">Back to A2Z AI</a>
        </div>
      </body>
    </html>
  `;
}
