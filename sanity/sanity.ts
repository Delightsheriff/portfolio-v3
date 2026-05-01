import client from "./sanity.client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = client ? createImageUrlBuilder(client) : null;
const PROJECT_ORDER = "_createdAt desc";
const PLACEHOLDER_IMAGE_URL = "/placeholder.svg?height=600&width=800";
const PROJECT_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
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
  iosUrl,
  androidUrl,
  challenge,
  solution,
  results,
  images,
  visible,
  featured
`;

function createPlaceholderImageBuilder() {
  return {
    width: () => createPlaceholderImageBuilder(),
    height: () => createPlaceholderImageBuilder(),
    fit: () => createPlaceholderImageBuilder(),
    url: () => PLACEHOLDER_IMAGE_URL,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!source) {
    return createPlaceholderImageBuilder();
  }

  if (
    typeof source === "string" ||
    !source.asset?._ref ||
    source.asset._ref === "placeholder"
  ) {
    return createPlaceholderImageBuilder();
  }

  if (!builder) {
    return createPlaceholderImageBuilder();
  }

  try {
    return builder.image(source);
  } catch (error) {
    console.log("Error building image URL, using placeholder:", error);
    return createPlaceholderImageBuilder();
  }
}

export async function getProjects() {
  if (!client) {
    console.log("Sanity client not configured, using fallback projects data");
  }

  try {
    const projects = await client.fetch(`
      *[_type == "project" && visible == true] | order(${PROJECT_ORDER}) {
        ${PROJECT_FIELDS},
        "nextProject": *[_type == "project" && visible == true && _id != ^._id && _createdAt < ^._createdAt] | order(${PROJECT_ORDER}) [0] {
          title,
          "slug": slug.current
        }
      }
    `);
    return projects;
  } catch (error) {
    console.log(
      "Error fetching from Sanity, using fallback projects data:",
      error,
    );
    return;
  }
}

export async function getProject(slug: string) {
  if (!client) {
    console.log("Sanity client not configured, using fallback project data");
  }

  try {
    const project = await client.fetch(
      `
      *[_type == "project" && visible == true && slug.current == $slug][0] {
        ${PROJECT_FIELDS},
        "nextProject": *[_type == "project" && visible == true && _id != ^._id && _createdAt < ^._createdAt] | order(${PROJECT_ORDER}) [0] {
          title,
          "slug": slug.current
        }
      }
    `,
      { slug },
    );
    return project;
  } catch (error) {
    console.log(
      "Error fetching project from Sanity, using fallback data:",
      error,
    );
  }
}

export async function getExperiences() {
  if (!client) {
    console.log(
      "Sanity client not configured, using fallback experiences data",
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
      error,
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
        resumeUrl,
        email,
        socialLinks
      }
    `);
    return about;
  } catch (error) {
    console.log(
      "Error fetching about from Sanity, using fallback data:",
      error,
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
      error,
    );
  }
}

// Add new function for featured projects
export async function getFeaturedProjects(limit = 3) {
  if (!client) {
    console.log(
      "Sanity client not configured, using fallback featured projects data",
    );
  }

  try {
    const featuredProjects = await client.fetch(
      `
      *[_type == "project" && visible == true && featured == true] | order(${PROJECT_ORDER}) [0...$limit] {
        ${PROJECT_FIELDS}
      }
    `,
      { limit },
    );
    return featuredProjects;
  } catch (error) {
    console.log(
      "Error fetching featured projects from Sanity, using fallback data:",
      error,
    );
    return [];
  }
}

export async function getVideoPitch() {
  if (!client) {
    console.log(
      "Sanity client not configured, using fallback video pitch data",
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
      error,
    );
  }
}

// Blog functions removed — blog is disabled (content preserved in Sanity).
// To re-enable, restore these queries and the app/blog routes.
