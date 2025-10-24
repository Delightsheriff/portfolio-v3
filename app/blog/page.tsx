import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPosts } from "@/sanity/sanity";
import { ThemeToggle } from "@/components/nav/theme-toggle";
import { BlogList } from "@/components/blog/blog-list";
import { CustomCursor } from "@/components/animations/custom-cursor";

export const metadata = {
  title: "Blog - Amadi-Sheriff Delight",
  description: "Thoughts on software development, learning, and life.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background">
        {/* Simple Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif">
              Welcome In
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Get comfortable. This is where I dump my thoughts on building
              stuff, learning out loud, and figuring things out as I go.
              You&apos;ll find tech discoveries, honest rants, life updates, and
              the occasional existential crisis. No filter, no perfectly
              polished takes, just real experiences from someone who&apos;s
              still learning every single day.
            </p>
          </div>
        </section>

        {/* Blog List */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <BlogList posts={posts} />
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Amadi-Sheriff Delight
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
