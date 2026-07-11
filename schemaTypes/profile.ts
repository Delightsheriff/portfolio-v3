import { defineField } from "sanity";

const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "about", title: "About Section" },
  ],
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Current Status",
      type: "string",
      group: "hero",
      description: 'e.g., "Currently available"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "hero",
      description: 'e.g., "Based in Lagos, Nigeria"',
    }),
    defineField({
      name: "stackPills",
      title: "Stack Pills",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      description: "Short tech labels shown as pills, e.g. TypeScript, React Native",
    }),
    defineField({
      name: "title",
      title: "About Title",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      group: "about",
    }),
    defineField({
      name: "manifesto",
      title: "Manifesto",
      type: "array",
      of: [{ type: "block" }],
      group: "about",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", title: "Category", type: "string" },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
      group: "about",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
      description: "Link to your resume (Google Doc, PDF, etc.)",
      group: "about",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter", value: "twitter" },
                ],
              },
            },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
      group: "about",
    }),
  ],
};

export default profile;
