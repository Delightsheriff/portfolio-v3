import { redirect } from "next/navigation";

// Blog is temporarily disabled — redirect all post URLs to home.
export default function BlogPostPage() {
  redirect("/");
}

export function generateStaticParams() {
  return [];
}
