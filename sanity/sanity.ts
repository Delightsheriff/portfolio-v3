import {
  fallbackAbout,
  fallbackExperiences,
  fallbackHero,
  fallbackProjects,
} from "@/fallbacks";
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
    return fallbackProjects;
  }

  try {
    // Here you fetch from Sanity when ready
    const projects = await client.fetch(`
      *[_type == "project"] | order(orderRank) {
        _id,
        title,
        slug,
        description,
        overview,
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
        "nextProject": *[_type == "project" && ^.orderRank < orderRank] | order(orderRank) [0] {
          title,
          "slug": slug.current
        }
      }
    `);
    return projects.length > 0 ? projects : fallbackProjects;
  } catch (error) {
    console.log(
      "Error fetching from Sanity, using fallback projects data:",
      error
    );
    return fallbackProjects;
  }
}

export async function getProject(slug: string) {
  if (!client) {
    console.log("Sanity client not configured, using fallback project data");
    return fallbackProjects.find((p) => p.slug.current === slug);
  }

  try {
    // Here you fetch from Sanity when ready
    const project = await client.fetch(
      `
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        overview,
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
        "nextProject": *[_type == "project" && ^.orderRank < orderRank] | order(orderRank) [0] {
          title,
          "slug": slug.current
        }
      }
    `,
      { slug }
    );
    return project || fallbackProjects.find((p) => p.slug.current === slug);
  } catch (error) {
    console.log(
      "Error fetching project from Sanity, using fallback data:",
      error
    );
    return fallbackProjects.find((p) => p.slug.current === slug);
  }
}

export async function getExperiences() {
  if (!client) {
    console.log(
      "Sanity client not configured, using fallback experiences data"
    );
    return fallbackExperiences;
  }

  try {
    // Here you fetch from Sanity when ready
    const experiences = await client.fetch(`
      *[_type == "experience"] | order(order) {
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
        current
      }
    `);
    return experiences.length > 0 ? experiences : fallbackExperiences;
  } catch (error) {
    console.log(
      "Error fetching experiences from Sanity, using fallback data:",
      error
    );
    return fallbackExperiences;
  }
}

export async function getAbout() {
  if (!client) {
    console.log("Sanity client not configured, using fallback about data");
    return fallbackAbout;
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
    return about || fallbackAbout;
  } catch (error) {
    console.log(
      "Error fetching about from Sanity, using fallback data:",
      error
    );
    return fallbackAbout;
  }
}

export async function getHero() {
  if (!client) {
    console.log("Sanity client not configured, using fallback hero data");
    return fallbackHero;
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
    return hero || fallbackHero;
  } catch (error) {
    console.log("Error fetching hero from Sanity, using fallback data:", error);
    return fallbackHero;
  }
}

// Add new function for featured projects
export async function getFeaturedProjects(limit = 3) {
  const projects = await getProjects();
  return projects.slice(0, limit);
}
