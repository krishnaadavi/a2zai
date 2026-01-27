import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './prisma';
import { headers } from 'next/headers';

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

/**
 * Get authenticated user from either:
 * 1. NextAuth session cookie (web)
 * 2. Authorization: Bearer <sessionToken> header (mobile)
 *
 * Returns null if not authenticated.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  // 1. Try NextAuth cookie-based session (existing web behavior)
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  // 2. Try Bearer token (mobile)
  const headersList = await headers();
  const authHeader = headersList.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const sessionToken = authHeader.slice(7);
  if (!sessionToken) return null;

  const dbSession = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!dbSession || dbSession.expires < new Date()) {
    if (dbSession) {
      await prisma.session.delete({ where: { sessionToken } }).catch(() => {});
    }
    return null;
  }

  return {
    id: dbSession.user.id,
    name: dbSession.user.name,
    email: dbSession.user.email,
    image: dbSession.user.image,
  };
}
