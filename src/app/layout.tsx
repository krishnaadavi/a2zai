import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A2Z AI | AI Intelligence for Builders and Investors",
  description: "Track AI companies, funding, model releases, and market signals in one intelligence feed. Learn AI fundamentals in a dedicated section.",
  keywords: "AI intelligence, AI companies, AI funding, AI startups, AI models, model releases, AI investors, AI news, A2Z AI",
  authors: [{ name: "A2Z AI" }],
  creator: "A2Z AI",
  metadataBase: new URL('https://a2zai.ai'),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://a2zai.ai',
    siteName: 'A2Z AI',
    title: 'A2Z AI | AI Intelligence for Builders and Investors',
    description: 'Track AI companies, funding, model releases, and market signals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A2Z AI | AI Intelligence for Builders and Investors',
    description: 'Track AI companies, funding, model releases, and market signals.',
    creator: '@a2zai_news',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
  },
  themeColor: '#030712',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'A2Z AI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BackToTop />
          </div>
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
