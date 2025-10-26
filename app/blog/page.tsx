import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPosts } from "@/sanity/sanity";
import { ThemeToggle } from "@/components/nav/theme-toggle";
import { BlogList } from "@/components/blog/blog-list";
import { CustomCursor } from "@/components/animations/custom-cursor";
import Footer from "@/components/nav/footer";
import { BlogPost } from "@/interface/sanity";
import { Metadata } from "next";

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
        <Footer />
      </div>
    </>
  );
}
