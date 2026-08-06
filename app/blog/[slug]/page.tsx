import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs, urlFor } from "@/sanity/sanity";
import GoBack from "@/components/go-back";
import Footer from "@/components/nav/footer";
import { BlogPostHeader, BlogPostBody } from "@/components/blog-post-layout";
import { BlogContent } from "@/components/blog-content";
import { SITE_URL } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.title}: Blog Post`;
  const description = post.excerpt || "Read this technical article";
  const ogImage = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(630).fit("crop").url()
    : "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author ?? "Delight Sheriff",
      url: SITE_URL,
    },
    ...(post.featuredImage && {
      image: urlFor(post.featuredImage).width(1200).height(630).fit("crop").url(),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <GoBack />
      <main className="min-h-screen bg-background">
        <article className="max-w-3xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <BlogPostHeader>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <time>{publishDate}</time>
                {post.author && (
                  <>
                    <span className="text-border">·</span>
                    <span>By {post.author}</span>
                  </>
                )}
              </div>
            </div>

            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </BlogPostHeader>

          <BlogPostBody>
            {post.content && <BlogContent content={post.content} />}
          </BlogPostBody>
        </article>

        <Footer />
      </main>
    </>
  );
}
