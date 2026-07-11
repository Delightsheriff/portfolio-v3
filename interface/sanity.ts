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
  _createdAt?: string;
  _updatedAt?: string;
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
  repoUrls?: { label: string; url: string }[];
  liveUrl?: string;
  apiDocsUrl?: string;
  demoVideoUrl?: string;
  iosUrl?: string;
  androidUrl?: string;
  impactMetric?: { value: string; label: string };
  challenge: string;
  architecture?: string;
  solution: string;
  results: string[];
  images: (SanityImage | null)[];
  nextProject?: {
    title: string;
    slug: string;
  };
  featured: boolean;
}

export interface Profile {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  status: string;
  location: string;
  stackPills?: string[];
  title: string;
  bio: any[];
  manifesto: any[];
  skills: {
    category: string;
    items: string[];
  }[];
  profileImage: SanityImage | null;
  resumeUrl?: string;
  email: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
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
}

export interface ProjectGroupPart {
  label: string;
  project: Project;
}

export interface ProjectGroup {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  parts: ProjectGroupPart[];
  year?: string;
  featured: boolean;
  order?: number;
}

export interface UsesItem {
  name: string;
  description?: string;
  url?: string;
}

export interface UsesCategory {
  name: string;
  items: UsesItem[];
}

export interface Uses {
  title: string;
  description?: string;
  categories: UsesCategory[];
  updatedLabel?: string;
}

