import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI on AI | Stay AI-current in 5 minutes",
  description: "Byte-sized AI news, model updates, and learning resources. Stay current with the latest in artificial intelligence, machine learning, and LLMs.",
  keywords: "AI news, artificial intelligence, machine learning, LLM, GPT, Claude, Gemini, AI models, AI research",
  authors: [{ name: "AI on AI" }],
  creator: "AI on AI",
  metadataBase: new URL('https://aionai.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aionai.dev',
    siteName: 'AI on AI',
    title: 'AI on AI | Stay AI-current in 5 minutes',
    description: 'Byte-sized AI news, model updates, and learning resources.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI on AI - Your daily AI briefing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI on AI | Stay AI-current in 5 minutes',
    description: 'Byte-sized AI news, model updates, and learning resources.',
    images: ['/og-image.png'],
    creator: '@aionai',
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
