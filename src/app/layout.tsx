import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elouize Boost Pro - Supercharge Your Social Media",
  description: "The most powerful platform for boosting your videos on Instagram, Facebook, and TikTok. Automate engagement, track analytics, and grow your audience.",
  keywords: ["social media", "instagram", "facebook", "tiktok", "boost", "engagement", "analytics"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-dark-900">{children}</div>
      </body>
    </html>
  );
}
