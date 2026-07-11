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
  repoUrls,
  liveUrl,
  apiDocsUrl,
  demoVideoUrl,
  iosUrl,
  androidUrl,
  impactMetric,
  challenge,
  architecture,
  solution,
  results,
  images,
  featured,
  spotlight
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
      *[_type == "project"] | order(${PROJECT_ORDER}) {
        ${PROJECT_FIELDS},
        "nextProject": *[_type == "project" && _id != ^._id && _createdAt < ^._createdAt] | order(${PROJECT_ORDER}) [0] {
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
    return [];
  }
}

export async function getProject(slug: string) {
  if (!client) {
    console.log("Sanity client not configured, using fallback project data");
  }

  try {
    const project = await client.fetch(
      `
      *[_type == "project" && slug.current == $slug][0] {
        ${PROJECT_FIELDS},
        "nextProject": *[_type == "project" && _id != ^._id && _createdAt < ^._createdAt] | order(${PROJECT_ORDER}) [0] {
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
    return experiences;
  } catch (error) {
    console.log(
      "Error fetching experiences from Sanity, using fallback data:",
      error,
    );
  }
}

export async function getProfile() {
  if (!client) {
    console.log("Sanity client not configured, using fallback profile data");
  }

  try {
    const profile = await client.fetch(`
      *[_type == "profile"][0] {
        headline,
        subheadline,
        ctaText,
        ctaLink,
        status,
        location,
        stackPills,
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
    return profile;
  } catch (error) {
    console.log(
      "Error fetching profile from Sanity, using fallback data:",
      error,
    );
    return {};
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
      *[_type == "project" && featured == true] | order(${PROJECT_ORDER}) [0...$limit] {
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

export async function getFeaturedProjectGroups() {
  if (!client) return [];
  try {
    const groups = await client.fetch(`
      *[_type == "projectGroup" && featured == true]
        | order(coalesce(order, 9999) asc, _createdAt desc) {
          _id,
          title,
          slug,
          description,
          year,
          featured,
          order,
          parts[] {
            label,
            project-> {
              ${PROJECT_FIELDS}
            }
          }
        }
    `);
    return groups ?? [];
  } catch (error) {
    console.log("Error fetching project groups:", error);
    return [];
  }
}

export async function getProjectGroup(slug: string) {
  if (!client) return null;
  try {
    const group = await client.fetch(
      `*[_type == "projectGroup" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        year,
        featured,
        order,
        parts[] {
          label,
          project-> {
            ${PROJECT_FIELDS}
          }
        }
      }`,
      { slug }
    );
    return group;
  } catch (error) {
    console.log("Error fetching project group:", error);
    return null;
  }
}

export async function getUses() {
  if (!client) return null;
  try {
    const uses = await client.fetch(`
      *[_type == "uses"][0] {
        title,
        description,
        categories,
        updatedLabel
      }
    `);
    return uses;
  } catch (error) {
    console.log("Error fetching uses from Sanity:", error);
    return null;
  }
}

// Blog queries: re-enabled for blog page
export async function getAllBlogs() {
  try {
    const blogs = await client.fetch(
      `      *[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        body,
        publishedAt,
        featured,
        author
      }`
    );
    return blogs;
  } catch (error) {
    console.log("Error fetching blogs from Sanity:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const blog = await client.fetch(
      `*[_type == "blog" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        content,
        publishedAt,
        featured,
        author
      }`,
      { slug }
    );
    return blog;
  } catch (error) {
    console.log("Error fetching blog from Sanity:", error);
    return null;
  }
}
