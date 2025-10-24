import { defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog Posts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short description of the blog post",
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "featuredImage",
      title: "Featured Image (Optional)",
      type: "image",
      description: "Optional featured image for the post",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            language: "javascript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Python", value: "python" },
              { title: "JSON", value: "json" },
            ],
            withFilename: true,
          },
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "featured",
      title: "Pin This Post",
      type: "boolean",
      description: "Pin this post to the top of the blog",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      publishedAt: "publishedAt",
      featured: "featured",
    },
    prepare({ title, media, publishedAt, featured }) {
      return {
        title: `${featured ? "📌 " : ""}${title}`,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : "No date",
        media,
      };
    },
  },
});
