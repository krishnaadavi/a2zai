'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { LogIn, AlertTriangle } from 'lucide-react';

function getErrorMessage(error: string | null): string | null {
  if (!error) return null;
  if (error === 'OAuthSignin') {
    return 'Google sign-in is temporarily unavailable. Please try again in a moment.';
  }
  if (error === 'OAuthCallback') {
    return 'The sign-in callback could not be completed. Please retry.';
  }
  if (error === 'AccessDenied') {
    return 'Access denied by the provider.';
  }
  return 'Sign-in failed. Please try again.';
}

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');
  const errorMessage = useMemo(() => getErrorMessage(error), [error]);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-2xl border border-gray-800 bg-gray-900">
        <h1 className="text-2xl font-bold text-white">Sign in to A2Z AI</h1>
        <p className="text-gray-400 mt-2">
          Access watchlists, personalized briefs, and in-app alerts.
        </p>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-colors"
        >
          <LogIn className="h-4 w-4" />
          Continue with Google
        </button>

        <Link href="/" className="mt-4 inline-block text-sm text-gray-400 hover:text-white">
          Back to home
        </Link>
      </div>
    </div>
  );
}
