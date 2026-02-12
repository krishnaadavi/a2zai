import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | A2Z AI',
  description: 'Privacy policy for A2Z AI — your A-to-Z guide to AI.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Last updated: January 27, 2026</p>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p>
                A2Z AI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the
                website at <span className="text-purple-400">a2zai.ai</span> and the A2Z AI mobile
                application. This Privacy Policy explains what information we collect, how we use it,
                and your choices regarding your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">Account Information</h3>
              <p>
                When you sign in with Google or Apple, we receive your name, email address, and
                profile photo from the provider. We store this information to maintain your account
                and sync your progress across devices.
              </p>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">Learning Progress</h3>
              <p>
                Quiz scores, streaks, terms learned, bookmarks, and other learning progress data are
                stored locally on your device. If you sign in, progress may be synced to our servers
                so you can access it across devices.
              </p>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">Usage Analytics</h3>
              <p>
                We use Vercel Analytics and Google Analytics on the website to understand how visitors
                use the site. On the mobile app, analytics events (such as app opens) are logged
                locally and are not sent to third-party analytics services.
              </p>

              <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">Push Notifications</h3>
              <p>
                If you enable push notifications on the mobile app, we store a device token to
                deliver notifications. You can disable notifications at any time in your device
                settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Authenticate your identity and manage your account</li>
                <li>Sync learning progress across your devices</li>
                <li>Send push notifications you have opted into</li>
                <li>Understand aggregate usage patterns to improve the product</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share data with service providers
                that help us operate (e.g., hosting, analytics) under strict data-processing
                agreements. We may also disclose information if required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active. Locally stored
                data on the mobile app remains on your device until you uninstall the app or clear
                app data. You can request deletion of your account and associated data by contacting
                us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of push notifications via device settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Children&apos;s Privacy</h2>
              <p>
                Our services are suitable for all ages. We do not knowingly collect personal
                information from children under 13 without parental consent. If you believe we have
                collected such information, please contact us and we will promptly delete it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by posting the updated policy on this page with a revised date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or want to exercise your data rights,
                contact us at{' '}
                <a
                  href="mailto:krishnaadavi@gmail.com"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  krishnaadavi@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
