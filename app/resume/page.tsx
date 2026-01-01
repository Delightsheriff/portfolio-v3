import { ResumePage } from "@/components/resume-page";
import { getResume } from "@/sanity/sanity";
import Loading from "../loading";
import ClientOnly from "@/components/client-wrapper";
import type { Metadata } from "next";
import { Resume as ResumeI } from "@/interface/sanity";

// --- Step 1: Convert static metadata to a dynamic generateMetadata function ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Resume - Amadi-Sheriff Delight";
  const description =
    "View and download the professional resume of Amadi-Sheriff Delight, detailing my experience in software engineering, full-stack development, and product building.";

  return {
    title,
    description,
    // --- CANONICAL URL ---
    alternates: {
      canonical: "/resume",
    },

    // --- OPEN GRAPH & TWITTER CARDS (FOR SOCIAL SHARING) ---
    openGraph: {
      title,
      description,
      type: "profile", // "profile" is a perfect type for a resume page
      url: "https://www.delightsheriff.com/resume",
      // IMPORTANT: Create a specific image for your resume page (1200x630px)
      images: [
        {
          url: "/og-image.png", // Place this in your /public folder
          width: 1200,
          height: 630,
          alt: "The professional resume of Amadi-Sheriff Delight",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

// --- Step 2: Add dynamic JSON-LD structured data to your Page Component ---

export default async function Resume() {
  const resumeData: ResumeI = await getResume();

  if (!resumeData) {
    return <Loading />;
  }

  // Create a rich JSON-LD schema based on your resume data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amadi-Sheriff Delight",
    url: "https://www.delightsheriff.com/resume",
    jobTitle: "Software Engineer",
    // Links to your social profiles to help Google connect your entities
    sameAs: [
      "https://github.com/delightsheriff",
      "https://www.linkedin.com/in/delightsheriff",
      "https://x.com/delightsheriff",
    ],
    // Dynamically list your work experience
    worksFor: resumeData.workExperience.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
    // Dynamically list your education
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: resumeData.education[0]?.institution,
    },
    // Dynamically list your skills
    knowsAbout: resumeData.technicalSkills.map((skill) => skill.name),
  };

  return (
    <>
      {/* This script injects the rich structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientOnly>
        <ResumePage resumeData={resumeData} />
      </ClientOnly>
    </>
  );
}
