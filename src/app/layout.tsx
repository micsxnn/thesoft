import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://thesoft.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "thesoft — engenharia de software, direto ao ponto",
    template: "%s — thesoft",
  },
  description:
    "Tutoriais de engenharia de software: Next.js, React, TypeScript, Git e deploy. Direto ao ponto, com código que funciona.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Git",
    "Deploy",
    "engenharia de software",
    "tutoriais",
    "blog",
  ],
  authors: [{ name: "micaelsan", url: "https://github.com/micsxnn" }],
  creator: "micaelsan",
  icons: {
    icon: [{ url: "/avatar.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "thesoft",
    title: "thesoft — engenharia de software, direto ao ponto",
    description:
      "Tutoriais de engenharia de software: Next.js, React, TypeScript, Git e deploy. Direto ao ponto, com código que funciona.",
    images: [{ url: "/avatar.png", width: 460, height: 460, alt: "thesoft" }],
  },
  twitter: {
    card: "summary",
    title: "thesoft — engenharia de software, direto ao ponto",
    description:
      "Tutoriais de engenharia de software: Next.js, React, TypeScript, Git e deploy.",
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "thesoft RSS" }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-background text-foreground selection:bg-[#5ce49e] selection:text-[#0a0a0a]`}
      >
        <SiteHeader />
        <main className="flex-1 w-full">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
