// schemas/resumePage.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "resumePage",
  title: "Resume Page",
  type: "document",
  fields: [
    // Header Section
    defineField({
      name: "headline",
      title: "Header Headline",
      type: "string",
      description: "The main subtitle under 'Resume'.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "Upload your resume in PDF format for the download button.",
      validation: (Rule) => Rule.required(),
    }),

    // Contact Info Section
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "websiteUrl",
      title: "Portfolio Website URL",
      type: "url",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" }, // e.g., 'github', 'linkedin'
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),

    // Professional Profile / Summary Section
    defineField({
      name: "professionalProfile",
      title: "Professional Profile / Summary",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    // Work Experience Section
    defineField({
      name: "workExperience",
      title: "Work Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", title: "Role", type: "string" },
            { name: "company", title: "Company", type: "string" },
            { name: "period", title: "Period", type: "string" },
            {
              name: "achievements",
              title: "Achievements / Description",
              type: "array",
              of: [{ type: "text" }],
            },
          ],
        },
      ],
    }),

    // Skills Section
    defineField({
      name: "technicalSkills",
      title: "Technical Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", title: "Category", type: "string" }, // e.g., 'Frontend', 'Backend'
            {
              name: "skillsList",
              title: "Skills (comma-separated)",
              type: "text",
            },
          ],
        },
      ],
    }),

    // Education Section
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "degree", title: "Degree", type: "string" },
            { name: "institution", title: "Institution", type: "string" },
            { name: "period", title: "Period", type: "string" },
          ],
        },
      ],
    }),

    // Certifications Section
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Resume Page Content",
      };
    },
  },
});
