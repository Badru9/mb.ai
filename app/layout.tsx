import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import JsonLd from "./components/JsonLd";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const baseUrl = "https://badrudev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "badrudev | Software Engineer",
    template: "%s | badrudev",
  },
  description:
    "Moh Badrujaman — Frontend-focused Fullstack Developer with 2+ years experience. Building production web apps with React, Next.js, TypeScript, TailwindCSS, Laravel, and ExpressJS.",
  keywords: [
    "frontend developer",
    "fullstack developer",
    "react developer",
    "next.js developer",
    "typescript",
    "tailwindcss",
    "web developer",
    "portfolio",
  ],
  authors: [{ name: "Moh Badrujaman", url: baseUrl }],
  creator: "Moh Badrujaman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "badrudev",
    title: "badrudev | Software Engineer",
    description:
      "Frontend-focused Fullstack Developer with 2+ years experience building production web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "badrudev Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "badrudev | Software Engineer",
    description:
      "Frontend-focused Fullstack Developer with 2+ years experience building production web applications.",
    images: ["/og-image.png"],
    creator: "@badru9",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="google-site-verification"
          content="QyRZ8y2-AMoKjsU-iuXpfcvWCaluJgh6ti-XaeK_sHY"
        />
      </head>
      <body className={lexend.variable}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--accent-foreground)] focus:rounded-md"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
