import { ResumePage } from "@/components/resume-page";
import { getResume } from "@/sanity/sanity";
import Loading from "../loading";
import type { Metadata } from "next";
import type { Resume } from "@/interface/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Resume — Amadi-Sheriff Delight";
  const description =
    "Professional resume of Amadi-Sheriff Delight — Software Engineer & Mobile Developer with expertise in React, Next.js, React Native, and Node.js.";

  return {
    title,
    description,
    alternates: { canonical: "/resume" },
    openGraph: {
      title,
      description,
      type: "profile",
      url: "https://www.delightsheriff.com/resume",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export default async function ResumePage_() {
  const resumeData: Resume = await getResume();

  if (!resumeData) return <Loading />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amadi-Sheriff Delight",
    url: "https://www.delightsheriff.com",
    jobTitle: "Software Engineer & Mobile Developer",
    sameAs: [
      "https://github.com/delightsheriff",
      "https://www.linkedin.com/in/delightsheriff",
      "https://x.com/delightsheriff",
    ],
    worksFor: resumeData.workExperience?.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: resumeData.education?.[0]?.institution,
    },
    knowsAbout: resumeData.technicalSkills?.map((s) => s.category),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumePage resumeData={resumeData} />
    </>
  );
}
