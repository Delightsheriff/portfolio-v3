import { ProjectsPage } from "@/components/projects-page";
import { Project } from "@/interface/sanity";
import { getAbout, getProjects } from "@/sanity/sanity";
import type { Metadata } from "next";

export const revalidate = 60;

// Convert the static metadata object to a dynamic generateMetadata function
export async function generateMetadata(): Promise<Metadata> {
  // You can fetch data here if needed for dynamic tags, but for now we'll keep it simple.

  const title = "Projects - Amadi-Sheriff Delight";
  const description =
    "A curated collection of my software engineering projects. Explore detailed case studies on building user-centric and scalable web applications.";

  return {
    title,
    description,
    // --- CANONICAL URL ---
    alternates: {
      canonical: "/projects",
    },

    // --- OPEN GRAPH & TWITTER CARDS (FOR SOCIAL SHARING) ---
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://www.delightsheriff.tech/projects",
      // IMPORTANT: Create a specific image for your projects page (1200x630px)
      images: [
        {
          url: "/og-projects-image.png", // Place this in your /public folder
          width: 1200,
          height: 630,
          alt: "A collection of software projects by Amadi-Sheriff Delight",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-projects-image.png"],
    },
  };
}

// --- Add Structured Data (JSON-LD) to your Page Component ---

export default async function Projects() {
  const projects: Project[] = await getProjects();
  const about = await getAbout();

  // Create the JSON-LD schema for this specific page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage", // This tells Google it's a collection of items
    name: "Software Engineering Projects by Amadi-Sheriff Delight",
    description:
      "A curated collection of my software engineering projects. Explore detailed case studies on building user-centric and scalable web applications.",
    url: "https://www.delightsheriff.tech/projects",
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
      url: "https://www.delightsheriff.tech",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork", // Each project is a "CreativeWork"
          name: project.title,
          url: project.liveUrl,
          description: project.description,
        },
      })),
    },
  };

  return (
    <>
      {/* This script injects the structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPage projects={projects} about={about} />
    </>
  );
}
