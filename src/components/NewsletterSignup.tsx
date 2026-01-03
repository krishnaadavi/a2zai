'use client';

import { useState } from 'react';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
    variant?: 'hero' | 'sidebar' | 'inline';
    className?: string;
}

export default function NewsletterSignup({ variant = 'hero', className = '' }: NewsletterSignupProps) {
    const [email, setEmail] = useState('');
    const [dailyDigest, setDailyDigest] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, dailyDigest, weeklyDigest }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message || 'Successfully subscribed!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to subscribe');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (variant === 'hero' || variant === 'inline') {
        return (
            <div className={`max-w-md mx-auto ${className}`}>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Subscribe
                                </>
                            )}
                        </button>
                    </div>

                    {/* Digest options */}
                    <div className="flex gap-4 justify-center mt-3 text-sm text-gray-400">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={dailyDigest}
                                onChange={(e) => setDailyDigest(e.target.checked)}
                                className="rounded text-purple-500 focus:ring-purple-500 bg-gray-800 border-gray-600"
                            />
                            Daily (weekdays)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={weeklyDigest}
                                onChange={(e) => setWeeklyDigest(e.target.checked)}
                                className="rounded text-purple-500 focus:ring-purple-500 bg-gray-800 border-gray-600"
                            />
                            Weekly recap
                        </label>
                    </div>
                </form>

                {status === 'success' && (
                    <div className="mt-3 flex items-center gap-2 text-green-400 text-sm justify-center">
                        <CheckCircle className="h-4 w-4" />
                        {message}
                    </div>
                )}
                {status === 'error' && (
                    <div className="mt-3 flex items-center gap-2 text-red-400 text-sm justify-center">
                        <AlertCircle className="h-4 w-4" />
                        {message}
                    </div>
                )}

                <p className="text-gray-500 text-sm mt-2 text-center">
                    Free daily digest. No spam, unsubscribe anytime.
                </p>
            </div>
        );
    }

    // Sidebar variant - more compact
    return (
        <div className={`bg-gray-800 rounded-xl p-6 ${className}`}>
            <h3 className="text-white font-bold text-lg mb-2">Stay AI-current</h3>
            <p className="text-gray-400 text-sm mb-4">Get the top 5 AI stories in your inbox daily.</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all disabled:opacity-50"
                >
                    {loading ? 'Subscribing...' : 'Subscribe Free'}
                </button>
            </form>

            {status === 'success' && (
                <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    {message}
                </div>
            )}
        </div>
    );
}
