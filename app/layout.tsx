import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/animations/page-transition";
import { ThemeProvider } from "@/components/animations/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amadi-Sheriff Delight - Software Engineer",
  description:
    "An entrepreneurial Software Engineer with four years of experience driving product vision and delivering robust, scalable applications. Expert in the MERN stack and Next.js, I specialize in creating high-performance, user-centric interfaces from the ground up.",
  keywords: [
    "software engineer",
    "frontend developer",
    "fullstack developer",
    "web developer",
    "backend developer",
    "react",
    "next.js",
    "typescript",
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
    title: "Amadi-Sheriff Delight | Software Engineer & Founder",
    description:
      "Explore the portfolio of Amadi-Sheriff Delight, a software engineer specializing in building exceptional web applications.",
    siteName: "Amadi-Sheriff Delight Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amadi-Sheriff Delight - Software Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Amadi-Sheriff Delight | Software Engineer & Founder",
    description:
      "A software engineer and founder building high-quality, user-centric web applications.",
    creator: "@delightsheriff",
    images: ["/og-image.png"],
  },

  // --- ICONS & FAVICONS ---
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amadi-Sheriff Delight",
    url: "https://www.delightsheriff.com",
    sameAs: [
      "https://github.com/delightsheriff",
      "https://www.linkedin.com/in/delightsheriff",
      "https://x.com/delightsheriff",
    ],
    jobTitle: "Software Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Port Harcourt, Nigeria",
    },
    knowsAbout: [
      "Software Development",
      "Full-Stack Development",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "Website Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the MERN stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MERN stands for MongoDB, Express.js, React, and Node.js — a full-stack JavaScript solution for building modern web applications. (Source: https://developer.mozilla.org)",
        },
      },
      {
        "@type": "Question",
        name: "How does Next.js improve performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Next.js provides server-side rendering and automatic code splitting, which can reduce Largest Contentful Paint (LCP) by up to 30% and improve Core Web Vitals. (Source: https://nextjs.org)",
        },
      },
      {
        "@type": "Question",
        name: "What is TypeScript and why should I use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TypeScript is a statically typed superset of JavaScript that catches errors at compile time rather than runtime. According to the Stack Overflow Developer Survey 2024, TypeScript is the 3rd most loved programming language with 69% developer satisfaction. (Source: https://survey.stackoverflow.co/2024)",
        },
      },
      {
        "@type": "Question",
        name: "What are the benefits of React for frontend development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "React enables component-based architecture, virtual DOM for efficient rendering, and unidirectional data flow. It powers over 19 million websites worldwide according to W3Techs. (Source: https://w3techs.com/technologies/details/js-react)",
        },
      },
      {
        "@type": "Question",
        name: "How can server-side rendering improve SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Server-side rendering delivers fully rendered HTML to search engine crawlers, ensuring proper indexing. Google AI recommends SSR for improved crawl efficiency and faster First Contentful Paint. (Source: https://developers.google.com/search/docs/crawling-indexing/javascript/seo-basics)",
        },
      },
      {
        "@type": "Question",
        name: "What is the job outlook for software engineers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The U.S. Bureau of Labor Statistics projects software developer employment to grow 17% from 2023 to 2033, much faster than the average occupation. This represents approximately 124,400 new jobs. (Source: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)",
        },
      },
      {
        "@type": "Question",
        name: "What makes a good full-stack developer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A proficient full-stack developer understands the complete web development lifecycle, from database design (SQL/NoSQL) to frontend UI/UX implementation. Key skills include JavaScript/TypeScript proficiency, API design, version control, and problem-solving abilities. (Source: https://roadmap.sh/full-stack)",
        },
      },
    ],
  };
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Person JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
