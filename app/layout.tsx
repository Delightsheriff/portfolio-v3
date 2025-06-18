import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";

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
    "Senior Software Engineer crafting exceptional user experiences through thoughtful code architecture and innovative problem-solving.",
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
  authors: [{ name: "Amadi-Sheriff Delight" }],
  openGraph: {
    title: "Amadi-Sheriff Delight - Software Engineer",
    description:
      "Senior Software Engineer crafting exceptional user experiences through thoughtful code architecture and innovative problem-solving.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
