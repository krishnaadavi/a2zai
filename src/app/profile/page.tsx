import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { User, Settings, Bookmark, Rss, ArrowRight, Bell } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Profile | A2Z AI',
  description: 'Manage your A2Z AI profile and preferences.',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  const menuItems = [
    {
      href: '/feed',
      icon: Rss,
      label: 'My Feed',
      description: 'Personalized AI news based on your preferences',
      color: 'from-purple-500 to-cyan-500',
    },
    {
      href: '/profile/saved',
      icon: Bookmark,
      label: 'Saved Articles',
      description: 'Articles you\'ve bookmarked for later',
      color: 'from-blue-500 to-purple-500',
    },
    {
      href: '/profile/preferences',
      icon: Settings,
      label: 'Preferences',
      description: 'Content, topics, email notifications, and display settings',
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      href: '/profile/alerts',
      icon: Bell,
      label: 'Alerts',
      description: 'In-app personalized alert feed and read state',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-20 h-20 rounded-full border-4 border-purple-500/30"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">
                {session.user?.name || 'User'}
              </h1>
              <p className="text-gray-400">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors group"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {item.label}
                </h2>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
