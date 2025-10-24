/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "./blog-card";

interface BlogListProps {
  posts: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    featuredImage?: string;
    mainImage?: any;
    tags: string[];
    publishedAt: string;
    readTime: number;
    featured?: boolean;
  }>;
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Separate pinned and regular posts
  const pinnedPosts = useMemo(
    () => posts.filter((post) => post.featured),
    [posts]
  );
  const regularPosts = useMemo(
    () => posts.filter((post) => !post.featured),
    [posts]
  );

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return regularPosts;
    return regularPosts.filter((post) => post.tags?.includes(selectedTag));
  }, [regularPosts, selectedTag]);

  // Reset to page 1 when changing tags
  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
  };

  // Get count for each tag
  const getTagCount = (tag: string) => {
    return regularPosts.filter((post) => post.tags?.includes(tag)).length;
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-foreground mb-3">
          No posts yet
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Check back soon for new articles and insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-3 pb-8 border-b border-border">
          <button
            onClick={() => handleTagChange(null)}
            className={`text-sm font-mono transition-colors ${
              selectedTag === null
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({regularPosts.length})
          </button>
          {allTags.map((tag) => {
            const count = getTagCount(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`text-sm font-mono transition-colors ${
                  selectedTag === tag
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                #{tag} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && !selectedTag && (
        <div>
          {pinnedPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Regular Posts */}
      {filteredPosts.length > 0 ? (
        <div>
          {!selectedTag && pinnedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-mono text-muted-foreground">
                All Posts
              </h2>
            </div>
          )}
          <div>
            {filteredPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-serif text-foreground mb-2">
            No posts found
          </h3>
          <p className="text-muted-foreground mb-6 text-center">
            No articles match the tag{" "}
            <span className="text-primary font-medium">#{selectedTag}</span>
          </p>
          <button
            onClick={() => handleTagChange(null)}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
