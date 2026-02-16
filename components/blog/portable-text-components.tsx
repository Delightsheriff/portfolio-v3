import type { PortableTextComponents } from "@portabletext/react";
import { BiLinkExternal, BiSolidQuoteRight } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import HashScroll from "./hash-scroll";

export const customPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-2 mb-6 text-foreground leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-60 before:text-primary relative font-bold tracking-tight text-foreground lg:text-4xl text-3xl my-8"
      >
        <HashScroll text={children} />
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-60 before:text-primary relative block lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl text-foreground my-6"
      >
        <HashScroll text={children} />
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-6 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-60 before:text-primary relative inline-block font-semibold tracking-tight text-xl text-foreground mb-2 mt-4"
      >
        <HashScroll text={children} />
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border border-border rounded-md bg-muted/30">
        <BiSolidQuoteRight
          className="text-7xl absolute -top-7 -right-5 -rotate-12 text-muted-foreground/20"
          aria-hidden="true"
        />
        <div className="text-muted-foreground">{children}</div>
      </blockquote>
    ),
  },
  types: {
    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4">
        <code className="text-sm font-mono text-foreground">{value.code}</code>
      </pre>
    ),
    image: ({ value }) => (
      <figure className="my-8">
        <div className="relative w-full aspect-video">
          <Image
            src={value.asset?.url || "/placeholder.svg"}
            alt={value.alt || "Blog post image"}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover rounded-lg border border-border"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="font-medium italic text-foreground">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <Link
          href={value?.href || "#"}
          className="text-primary hover:underline inline-flex items-center gap-1"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
          {isExternal && (
            <BiLinkExternal className="inline text-sm" aria-hidden="true" />
          )}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="py-[0.15rem] px-1.5 rounded-md font-mono text-sm bg-muted border border-border text-primary font-medium">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc mt-5 ml-6 space-y-2 text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal mt-5 ml-6 space-y-2 text-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed text-foreground">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed text-foreground">{children}</li>
    ),
  },
};
