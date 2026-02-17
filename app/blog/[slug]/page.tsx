import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { getBlogPost, getBlogPosts } from "@/sanity/sanity";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.title} - Blog`;
  const description = post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.delightsheriff.com/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: ["Amadi-Sheriff Delight"],
      tags: post.tags,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@delightsheriff",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://www.delightsheriff.com/blog/${slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Amadi-Sheriff Delight",
      url: "https://www.delightsheriff.com",
    },
    ...(post.tags && { keywords: post.tags.join(", ") }),
    ...(post.readTime && {
      timeRequired: `PT${post.readTime}M`,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
