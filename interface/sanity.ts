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
  projectType?: {
    category: string;
    complexity: string;
    features?: string[];
    dataSource: string;
  };
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
  visible: boolean;
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
  _id: string;
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
  visible: boolean;
}

export interface Resume {
  headline: string;
  resumeFile: SanityImage | null;
  name: string;
  email: string;
  location: string;
  websiteUrl: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  professionalProfile: any[]; // Portable Text
  workExperience: Experience[];
  technicalSkills: any[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  certifications: string[];
}

export interface VideoPitch {
  _id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  topics: string[];
  enabled: boolean;
}
