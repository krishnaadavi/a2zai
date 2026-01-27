import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import crypto from 'crypto';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const appleJwksClient = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys',
  cache: true,
  cacheMaxAge: 86400000, // 24 hours
});

function getAppleSigningKey(kid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    appleJwksClient.getSigningKey(kid, (err, key) => {
      if (err) return reject(err);
      resolve(key!.getPublicKey());
    });
  });
}

async function verifyAppleToken(identityToken: string): Promise<{
  sub: string;
  email?: string;
}> {
  const decoded = jwt.decode(identityToken, { complete: true });
  if (!decoded || !decoded.header.kid) {
    throw new Error('Invalid Apple identity token');
  }

  const publicKey = await getAppleSigningKey(decoded.header.kid);

  const payload = jwt.verify(identityToken, publicKey, {
    algorithms: ['RS256'],
    issuer: 'https://appleid.apple.com',
    audience: 'ai.a2z.app',
  }) as { sub: string; email?: string };

  return { sub: payload.sub, email: payload.email };
}

async function verifyGoogleToken(idToken: string): Promise<{
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}> {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: [
      process.env.GOOGLE_CLIENT_ID || '',
      process.env.GOOGLE_IOS_CLIENT_ID || '',
    ],
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error('Invalid Google token');

  return {
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
}

// POST /api/auth/mobile - Sign in from mobile
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, token, user: userInfo } = body as {
      provider: string;
      token: string;
      user?: { name?: string; email?: string };
    };

    if (!provider || !token) {
      return NextResponse.json(
        { error: 'Missing required fields: provider, token' },
        { status: 400 }
      );
    }

    if (provider !== 'google' && provider !== 'apple') {
      return NextResponse.json(
        { error: 'Invalid provider. Must be "google" or "apple"' },
        { status: 400 }
      );
    }

    let sub: string;
    let email: string | undefined;
    let name: string | undefined;
    let picture: string | undefined;

    // Verify token with provider
    if (provider === 'google') {
      const verified = await verifyGoogleToken(token);
      sub = verified.sub;
      email = verified.email;
      name = verified.name;
      picture = verified.picture;
    } else {
      const verified = await verifyAppleToken(token);
      sub = verified.sub;
      email = verified.email || userInfo?.email;
      name = userInfo?.name;
    }

    // Find or create User and Account
    const existingAccount = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: sub,
        },
      },
      include: { user: true },
    });

    let user;
    if (existingAccount) {
      user = existingAccount.user;
    } else {
      // Check if user exists by email (link accounts)
      const existingUser = email
        ? await prisma.user.findUnique({ where: { email } })
        : null;

      if (existingUser) {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            type: 'oauth',
            provider,
            providerAccountId: sub,
            access_token: token,
            token_type: 'bearer',
          },
        });
        user = existingUser;
      } else {
        user = await prisma.user.create({
          data: {
            email: email || null,
            name: name || null,
            image: picture || null,
            emailVerified: new Date(),
            accounts: {
              create: {
                type: 'oauth',
                provider,
                providerAccountId: sub,
                access_token: token,
                token_type: 'bearer',
              },
            },
          },
        });
      }
    }

    // Create session
    const sessionToken = crypto.randomUUID();
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    return NextResponse.json({
      sessionToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      expiresAt: expires.toISOString(),
    });
  } catch (error) {
    console.error('Mobile auth error:', error);
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

// DELETE /api/auth/mobile - Sign out from mobile
export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: true });
    }

    const sessionToken = authHeader.slice(7);
    await prisma.session.delete({ where: { sessionToken } }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
