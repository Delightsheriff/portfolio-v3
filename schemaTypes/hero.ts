import { defineField } from "sanity";

const hero = {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Current Status",
      type: "string",
      description: 'e.g., "Currently available"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g., "Based in Lagos, Nigeria"',
    }),
  ],
};

export default hero;
