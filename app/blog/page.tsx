import { redirect } from "next/navigation";
import type { Metadata } from "next";

// Blog is temporarily disabled — redirecting visitors to homepage.
// Schema and content are preserved in Sanity; re-enable by restoring this page.
export default function BlogPage() {
  redirect("/");
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
