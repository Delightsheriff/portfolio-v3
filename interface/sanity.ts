/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  overview: string;
  client: string;
  role: string;
  duration: string;
  year: string;
  stack: string[];
  mainImage: SanityImage | null;
  githubUrl?: string;
  liveUrl?: string;
  challenge: string;
  solution: string;
  results: string[];
  images: (SanityImage | null)[];
  orderRank?: number;
  nextProject?: {
    title: string;
    slug: string;
  };
}

export interface About {
  title: string;
  bio: any[]; // Portable Text
  manifesto: any[]; // Portable Text
  skills: {
    category: string;
    items: string[];
  }[];
  profileImage: SanityImage | null;
  email: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface Hero {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  status: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
  current: boolean;
}
