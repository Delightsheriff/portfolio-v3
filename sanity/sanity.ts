import client from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

const builder = client ? imageUrlBuilder(client) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  // Handle null or undefined sources
  if (!source) {
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }

  // Handle placeholder strings or invalid references
  if (
    typeof source === "string" ||
    (source.asset && source.asset._ref === "placeholder")
  ) {
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }

  // If no Sanity client, return placeholder
  if (!builder) {
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }

  // Return proper Sanity image URL
  try {
    return builder.image(source);
  } catch (error) {
    console.log("Error building image URL, using placeholder:", error);
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }
}

export async function getProjects() {
  if (!client) {
    console.log("Sanity client not configured, using fallback projects data");
  }

  try {
    // Here you fetch from Sanity when ready
    const projects = await client.fetch(`
      *[_type == "project" && visible == true] | order(orderRank) {
        _id,
        title,
        slug,
        description,
        overview,
        projectType,
        client,
        role,
        duration,
        year,
        stack,
        mainImage,
        githubUrl,
        liveUrl,
        challenge,
        solution,
        results,
        images,
        orderRank,
        visible,
        "nextProject": *[_type == "project" && visible == true && ^.orderRank < orderRank] | order(orderRank) [0] {
          title,
          "slug": slug.current
        }
      }
    `);
    return projects;
  } catch (error) {
    console.log(
      "Error fetching from Sanity, using fallback projects data:",
      error
    );
    return;
  }
}

export async function getProject(slug: string) {
  if (!client) {
    console.log("Sanity client not configured, using fallback project data");
  }

  try {
    // Here you fetch from Sanity when ready
    const project = await client.fetch(
      `
      *[_type == "project" && visible == true && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        overview,
        projectType,
        client,
        role,
        duration,
        year,
        stack,
        mainImage,
        githubUrl,
        liveUrl,
        challenge,
        solution,
        results,
        images,
        visible,
        "nextProject": *[_type == "project" && visible == true && ^.orderRank < orderRank] | order(orderRank) [0] {
          title,
          "slug": slug.current
        }
      }
    `,
      { slug }
    );
    return project;
  } catch (error) {
    console.log(
      "Error fetching project from Sanity, using fallback data:",
      error
    );
  }
}

export async function getExperiences() {
  if (!client) {
    console.log(
      "Sanity client not configured, using fallback experiences data"
    );
  }

  try {
    // Here you fetch from Sanity when ready
    const experiences = await client.fetch(`
      *[_type == "experience" && visible == true] | order(order) {
        _id,
        company,
        role,
        period,
        location,
        type,
        description,
        achievements,
        technologies,
        order,
        current,
        visible
      }
    `);
    return experiences;
  } catch (error) {
    console.log(
      "Error fetching experiences from Sanity, using fallback data:",
      error
    );
  }
}

export async function getAbout() {
  if (!client) {
    console.log("Sanity client not configured, using fallback about data");
  }

  try {
    // Here you fetch from Sanity when ready
    const about = await client.fetch(`
      *[_type == "about"][0] {
        title,
        bio,
        manifesto,
        skills,
        profileImage,
        email,
        socialLinks
      }
    `);
    return about;
  } catch (error) {
    console.log(
      "Error fetching about from Sanity, using fallback data:",
      error
    );
  }
}

export async function getHero() {
  if (!client) {
    console.log("Sanity client not configured, using fallback hero data");
    return;
  }

  try {
    // Here you fetch from Sanity when ready
    const hero = await client.fetch(`
      *[_type == "hero"][0] {
        headline,
        subheadline,
        ctaText,
        ctaLink,
        status,
        location
      }
    `);
    return hero;
  } catch (error) {
    console.log("Error fetching hero from Sanity, using fallback data:", error);
    return;
  }
}

export async function getResume() {
  if (!client) {
    console.log("Sanity client not configured, using fallback resume data");
  }

  try {
    // Here you fetch from Sanity when ready
    const resume = await client.fetch(`
      *[_type == "resumePage"][0] {
        headline,
        resumeFile {
      asset->{
        url
      }
    },
        name,
        email,
        location,
        websiteUrl,
        socialLinks,
        professionalProfile,
        workExperience,
        technicalSkills,
        education,
        certifications
      }
    `);
    return resume;
  } catch (error) {
    console.log(
      "Error fetching resume from Sanity, using fallback data:",
      error
    );
  }
}

// Add new function for featured projects
export async function getFeaturedProjects(limit = 3) {
  const projects = await getProjects();
  return projects?.slice(0, limit);
}

export async function getVideoPitch() {
  if (!client) {
    console.log(
      "Sanity client not configured, using fallback video pitch data"
    );
  }

  try {
    const videoPitch = await client.fetch(`
      *[_type == "videoPitch"][0] {
        title,
        description,
        youtubeUrl,
        duration,
        topics,
        enabled
      }
    `);
    return videoPitch;
  } catch (error) {
    console.log(
      "Error fetching video pitch from Sanity, using fallback data:",
      error
    );
  }
}
