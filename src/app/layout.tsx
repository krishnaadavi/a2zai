import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A2Z AI | Your A-to-Z Guide to AI",
  description: "Your A-to-Z guide to AI. Byte-sized AI news, model updates, and learning resources. Stay current with artificial intelligence in 5 minutes a day.",
  keywords: "AI news, artificial intelligence, machine learning, LLM, GPT, Claude, Gemini, AI models, AI research, A2Z AI",
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
    title: 'A2Z AI | Your A-to-Z Guide to AI',
    description: 'Your A-to-Z guide to AI. Stay current in 5 minutes a day.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A2Z AI | Your A-to-Z Guide to AI',
    description: 'Your A-to-Z guide to AI. Stay current in 5 minutes a day.',
    creator: '@a2zai_news',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
