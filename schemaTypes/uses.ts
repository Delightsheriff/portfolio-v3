import { defineField } from "sanity";

const uses = {
  name: "uses",
  title: "Uses Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "What I Use",
    }),
    defineField({
      name: "description",
      title: "Intro Description",
      type: "text",
      description: "Short intro paragraph shown at the top of the uses page",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Category Name",
              type: "string",
              description: 'e.g., "Editor & Terminal", "Hardware", "Stack"',
            },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "name", title: "Name", type: "string" },
                    { name: "description", title: "Description", type: "text" },
                    { name: "url", title: "URL", type: "url" },
                  ],
                  preview: {
                    select: { title: "name", subtitle: "description" },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: "name" },
          },
        },
      ],
    }),
    defineField({
      name: "updatedLabel",
      title: "Last Updated Label",
      type: "string",
      description: 'e.g., "Last updated July 2025"',
    }),
  ],
};

export default uses;
