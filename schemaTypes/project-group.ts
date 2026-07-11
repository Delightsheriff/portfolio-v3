import { defineField } from "sanity";

const projectGroup = {
  name: "projectGroup",
  title: "Project Group",
  type: "document",
  description:
    "Group related projects together, e.g. a mobile app and its backend, or a frontend and its API.",
  fields: [
    defineField({
      name: "title",
      title: "Group Title",
      type: "string",
      description: 'The umbrella name, e.g. "Archive App"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "One sentence describing the overall system.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "parts",
      title: "Parts",
      type: "array",
      description:
        "Add each project that belongs to this group. The first entry is the visual lead on the works card.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description:
                'Short role label shown as a tab/badge, e.g. "Mobile App", "Backend API", "Admin Panel"',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "project",
              title: "Project",
              type: "reference",
              to: [{ type: "project" }],
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              label: "label",
              projectTitle: "project.title",
            },
            prepare(sel: any) {
              return {
                title: sel.label ?? "Unlabelled",
                subtitle: sel.projectTitle,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      description: "Show this group in the Featured Works section.",
      initialValue: true,
    }),
    defineField({
      name: "visible",
      title: "Visible on Website",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Leave blank to sort by date.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare(sel: any) {
      return {
        title: sel.title ?? "Untitled Group",
        subtitle: sel.subtitle,
      };
    },
  },
};

export default projectGroup;
