import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/animations/theme-provider";
import { PageTransition } from "@/components/animations/page-transition";
import { TooltipProvider } from "@/components/ui/tooltip";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Delight Sheriff — Software Engineer",
    template: "%s | Delight Sheriff",
  },
  description:
    "Software Engineer & Mobile Developer crafting high-performance, user-centric web and mobile applications. MERN stack, Next.js, React Native specialist.",
  keywords: [
    "software engineer",
    "mobile developer",
    "web developer",
    "fullstack developer",
    "frontend developer",
    "react native",
    "next.js",
    "typescript",
    "MERN stack",
    "Delight Sheriff",
    "Amadi-Sheriff Delight",
  ],
  authors: [
    { name: "Amadi-Sheriff Delight", url: "https://www.delightsheriff.com" },
  ],
  creator: "Amadi-Sheriff Delight",
  metadataBase: new URL("https://www.delightsheriff.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.delightsheriff.com",
    title: "Delight Sheriff — Software Engineer & Mobile Developer",
    description:
      "Crafting high-performance web and mobile applications. Available for full-time roles and select freelance projects.",
    siteName: "Delight Sheriff Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delight Sheriff — Software Engineer & Mobile Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delight Sheriff — Software Engineer & Mobile Developer",
    description:
      "Crafting high-performance web and mobile applications. Available for full-time roles.",
    creator: "@delightsheriff",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Delight Sheriff — Software Engineer",
    url: "https://www.delightsheriff.com",
    description:
      "Portfolio of Amadi-Sheriff Delight, Software Engineer specializing in web and mobile development.",
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.delightsheriff.com/projects?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amadi-Sheriff Delight",
    alternateName: "Delight Sheriff",
    url: "https://www.delightsheriff.com",
    sameAs: [
      "https://github.com/delightsheriff",
      "https://www.linkedin.com/in/delightsheriff",
      "https://x.com/delightsheriff",
    ],
    jobTitle: "Software Engineer",
    description:
      "Software Engineer specializing in web and mobile development using React, Next.js, React Native, and Node.js.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Port Harcourt, Nigeria",
    },
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Mobile App Development",
      "Web Development",
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MERN Stack",
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Skip to main content — keyboard/screen-reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            <PageTransition>{children}</PageTransition>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
