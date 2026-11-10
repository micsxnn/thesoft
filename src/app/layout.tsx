import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — software, Linux, Windows e gaming, direto ao ponto`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Git",
    "Deploy",
    "Linux",
    "Windows",
    "gaming",
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
    siteName: SITE_NAME,
    title: `${SITE_NAME} — software, Linux, Windows e gaming, direto ao ponto`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/avatar.png", width: 460, height: 460, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — software, Linux, Windows e gaming, direto ao ponto`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} RSS` }],
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
