import { getBlogPosts } from "@/sanity/sanity";
import { BlogPost } from "@/interface/sanity";
import { Metadata } from "next";
import { BlogPageClient } from "@/components/blog/BlogPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog - Amadi-Sheriff Delight";
  const description = "Thoughts on software development, learning, and life.";

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://www.delightsheriff.com/blog",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Blog by Amadi-Sheriff Delight",
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

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog by Amadi-Sheriff Delight",
    description: "Thoughts on software development, learning, and life.",
    url: "https://www.delightsheriff.com/blog",
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
      url: "https://www.delightsheriff.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          name: post.title,
          url: `https://www.delightsheriff.com/blog/${post.slug.current}`,
          description: post.excerpt,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPageClient posts={posts} />
    </>
  );
}
