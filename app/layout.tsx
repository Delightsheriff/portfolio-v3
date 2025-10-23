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
    { name: "Amadi-Sheriff Delight", url: "https://www.delightsheriff.tech" },
  ],
  creator: "Amadi-Sheriff Delight",
  metadataBase: new URL("https://www.delightsheriff.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.delightsheriff.tech",
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
    creator: "https://x.com/quietandstuff",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amadi-Sheriff Delight",
    url: "https://www.delightsheriff.tech",
    sameAs: [
      "https://github.com/delightsheriff",
      "https://www.linkedin.com/in/delightsheriff",
      "https://x.com/quietandstuff", // Add your social links
    ],
    jobTitle: "Software Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Port Harcourt, Nigeria",
    },
    knowsAbout: [
      "Software Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
    ],
  };
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Add the JSON-LD script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
