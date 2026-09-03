import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

// Falls back to the live Vercel URL; override with NEXT_PUBLIC_SITE_URL (Vercel
// project settings) if a custom domain is added later.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dennis-portfolio-ten.vercel.app";
const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.tagline,
  openGraph: {
    title,
    description: site.tagline,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <div className="bg-grid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
