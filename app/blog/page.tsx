import type { Metadata } from "next";
import { BlogPage } from "@/components/blog-page";
import { getAllBlogs } from "@/sanity/sanity";

export const metadata: Metadata = {
  title: "Blog: Articles & Insights",
  description:
    "Technical articles on React, Node.js, React Native, and building production systems.",
};

export default async function Page() {
  const posts = await getAllBlogs();

  return <BlogPage posts={posts} />;
}
