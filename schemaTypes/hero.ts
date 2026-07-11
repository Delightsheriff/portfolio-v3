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
    defineField({
      name: "stackPills",
      title: "Stack Pills",
      type: "array",
      of: [{ type: "string" }],
      description: "Short tech labels shown as pills in the hero, e.g. TypeScript, React Native, Node.js",
    }),
    defineField({
      name: "visible",
      title: "Show on Site",
      type: "boolean",
      description: "Toggle to show/hide the hero section",
      initialValue: true,
    }),
    defineField({
      name: "openToWork",
      title: "Open to Opportunities",
      type: "boolean",
      description: "Show 'Open to opportunities' badge in hero",
      initialValue: true,
    }),
  ],
};

export default hero;
