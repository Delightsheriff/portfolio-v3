"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
            <Image
              src={urlFor(value).url()}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      if (!value?.code) return null;
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-card border border-border p-4 text-sm">
          {value.filename && (
            <div className="mb-2 text-xs text-muted-foreground font-mono">
              {value.filename}
            </div>
          )}
          <code className={`language-${value.language ?? "text"}`}>
            {value.code}
          </code>
        </pre>
      );
    },
  },
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-highlight pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-highlight">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-highlight underline underline-offset-2 hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
};

export function BlogContent({ content }: { content: PortableTextBlock[] }) {
  return (
    <PortableText value={content} components={components} />
  );
}
