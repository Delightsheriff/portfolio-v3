import { getBlogPosts } from "@/sanity/sanity";
import { BlogPost } from "@/interface/sanity";
import { Metadata } from "next";
import { BlogPageClient } from "@/components/blog/BlogPageClient";

// export const metadata = {
//   title: "Blog - Amadi-Sheriff Delight",
//   description: "Thoughts on software development, learning, and life.",
// };

export async function generateMetadata(): Promise<Metadata> {
  // You can fetch data here if needed for dynamic tags, but for now we'll keep it simple.

  const title = "Blog - Amadi-Sheriff Delight";
  const description = "Thoughts on software development, learning, and life.";

  return {
    title,
    description,
    // --- CANONICAL URL ---
    alternates: {
      canonical: "/blog",
    },

    // --- OPEN GRAPH & TWITTER CARDS (FOR SOCIAL SHARING) ---
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://www.delightsheriff.tech/blog",
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

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  // Create the JSON-LD schema for this specific page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage", // This tells Google it's a collection of items
    name: "Blog by Amadi-Sheriff Delight",
    description: "Thoughts on software development, learning, and life.",
    url: "https://www.delightsheriff.tech/blog  ",
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
      url: "https://www.delightsheriff.tech",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork", // Each project is a "CreativeWork"
          name: post.title,
          url: post.slug.current,
          description: post.excerpt,
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
      <BlogPageClient posts={posts} />
    </>
  );
}
