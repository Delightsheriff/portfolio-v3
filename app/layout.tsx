import type React from "react";
import type { Metadata } from "next";
import {
  Space_Grotesk,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/animations/theme-provider";
import { PageTransition } from "@/components/animations/page-transition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SITE_URL = "https://www.delightsheriff.com";
const PERSON_NAME = "Amadi-Sheriff Delight";
const PERSON_DISPLAY_NAME = "Delight Sheriff";
const PERSON_NAME_VARIANTS = [
  "Amadi-Sheriff Delight",
  "Delight Sheriff",
  "Delight Amadi-Sheriff",
  "Amadi Sheriff Delight",
  "Sheriff Delight",
  "Sheriff Amadi",
  "Amadi Delight",
];
const SEO_KEYWORDS = [
  "Amadi-Sheriff Delight",
  "Delight Sheriff",
  "Delight Amadi-Sheriff",
  "Amadi Sheriff Delight",
  "Sheriff Delight",
  "Sheriff Amadi",
  "Amadi Delight",
  "software engineer",
  "full stack developer",
  "full-stack developer",
  "full stack engineer",
  "mobile developer",
  "mobile app developer",
  "web developer",
  "frontend developer",
  "front-end developer",
  "backend developer",
  "back-end developer",
  "MERN stack developer",
  "React developer",
  "React Native developer",
  "Next.js developer",
  "Node.js developer",
  "TypeScript developer",
  "JavaScript developer",
  "API developer",
  "portfolio website",
  "Nigeria software engineer",
  "Port Harcourt software engineer",
  "remote software engineer",
];

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default:
      "Delight Sheriff (Amadi-Sheriff Delight) | Software Engineer, Mobile Developer, Web Developer",
    template: "%s | Delight Sheriff",
  },
  description:
    "Amadi-Sheriff Delight, also known as Delight Sheriff, is a software engineer, mobile developer, web developer, frontend developer, backend developer, and full-stack developer building high-performance digital products with React, Next.js, React Native, Node.js, TypeScript, and the MERN stack.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title:
      "Delight Sheriff (Amadi-Sheriff Delight) | Software Engineer, Mobile Developer, Web Developer",
    description:
      "Portfolio of Amadi-Sheriff Delight, also known as Delight Sheriff: software engineer, mobile developer, web developer, frontend developer, backend developer, and full-stack product builder.",
    siteName: "Delight Sheriff Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delight Sheriff (Amadi-Sheriff Delight) - Software Engineer, Mobile Developer, Web Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Delight Sheriff (Amadi-Sheriff Delight) | Software Engineer, Mobile Developer, Web Developer",
    description:
      "Software engineer, mobile developer, web developer, frontend developer, backend developer, and full-stack builder creating high-performance digital products.",
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
    name: "Delight Sheriff - Software Engineer Portfolio",
    alternateName: PERSON_NAME_VARIANTS,
    url: SITE_URL,
    description:
      "Portfolio of Amadi-Sheriff Delight, also known as Delight Sheriff, a software engineer, mobile developer, web developer, frontend developer, backend developer, and full-stack developer.",
    keywords: SEO_KEYWORDS.join(", "),
    author: {
      "@type": "Person",
      name: PERSON_NAME,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: PERSON_NAME,
    givenName: "Delight",
    familyName: "Amadi-Sheriff",
    additionalName: "Sheriff",
    alternateName: PERSON_NAME_VARIANTS,
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    sameAs: [
      "https://github.com/delightsheriff",
      "https://www.linkedin.com/in/delightsheriff",
      "https://x.com/delightsheriff",
    ],
    jobTitle: [
      "Software Engineer",
      "Mobile Developer",
      "Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
    ],
    description:
      "Amadi-Sheriff Delight, also known as Delight Sheriff, is a software engineer, mobile developer, web developer, frontend developer, backend developer, and full-stack developer specializing in React, Next.js, React Native, Node.js, TypeScript, and scalable digital products.",
    knowsLanguage: ["English"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Harcourt",
      addressCountry: "Nigeria",
    },
    worksFor: {
      "@type": "Organization",
      name: PERSON_DISPLAY_NAME,
      url: SITE_URL,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Port Harcourt, Nigeria",
    },
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Frontend Development",
      "Backend Development",
      "Web Development",
      "Mobile App Development",
      "API Development",
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MERN Stack",
      "MongoDB",
      "PostgreSQL",
      "Sanity CMS",
    ],
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}#profile`,
    url: SITE_URL,
    name: `${PERSON_NAME} - Software Engineer Profile`,
    description:
      "Professional profile and portfolio of Amadi-Sheriff Delight, also known as Delight Sheriff.",
    mainEntity: {
      "@id": `${SITE_URL}#person`,
    },
  };

  const personJsonLdString = JSON.stringify(personJsonLd);
  const websiteJsonLdString = JSON.stringify(websiteJsonLd);
  const profilePageJsonLdString = JSON.stringify(profilePageJsonLd);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        spaceGrotesk.variable,
        playfair.variable,
        jetbrainsMono.variable,
        spaceGroteskHeading.variable,
      )}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLdString }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLdString }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: profilePageJsonLdString }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg"
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
