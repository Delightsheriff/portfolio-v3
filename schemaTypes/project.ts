import { defineField } from "sanity";

const projects = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Legacy Order Rank",
      type: "number",
      description:
        "Deprecated. Project ordering is now automatic based on publish time.",
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "object",
      fields: [
        {
          name: "category",
          title: "Category",
          type: "string",
          options: {
            list: [
              { title: "🚀 Full-Stack Application", value: "fullstack" },
              { title: "⚡ Frontend Application", value: "frontend" },
              { title: "🎨 Static Website", value: "static" },
              { title: "📱 Mobile Application", value: "mobile" },
              { title: "🔧 Backend API", value: "backend" },
              { title: "🤖 AI/ML Project", value: "ai" },
              { title: "📊 Data Visualization", value: "dataviz" },
              { title: "🛠️ Developer Tool", value: "devtool" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "complexity",
          title: "Complexity Level",
          type: "string",
          options: {
            list: [
              { title: "🟢 Simple", value: "simple" },
              { title: "🟡 Moderate", value: "moderate" },
              { title: "🟠 Complex", value: "complex" },
              { title: "🔴 Enterprise", value: "enterprise" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "features",
          title: "Key Features",
          type: "array",
          of: [
            {
              type: "string",
              options: {
                list: [
                  { title: "🔐 User Authentication", value: "auth" },
                  { title: "💳 Payment Processing", value: "payments" },
                  { title: "📊 Real-time Data", value: "realtime" },
                  { title: "🔍 Search & Filtering", value: "search" },
                  { title: "📱 Responsive Design", value: "responsive" },
                  { title: "🌐 API Integration", value: "api" },
                  { title: "📈 Analytics & Tracking", value: "analytics" },
                  { title: "🔔 Push Notifications", value: "notifications" },
                  { title: "🎨 Custom UI/UX", value: "custom-ui" },
                  { title: "⚡ Performance Optimized", value: "performance" },
                  { title: "🔒 Security Features", value: "security" },
                  {
                    title: "📤 File Upload/Management",
                    value: "file-management",
                  },
                  { title: "🤖 AI/ML Integration", value: "ai-integration" },
                  { title: "📧 Email Integration", value: "email" },
                  { title: "🌍 Multi-language Support", value: "i18n" },
                  { title: "📱 PWA Features", value: "pwa" },
                  { title: "🔄 Background Jobs", value: "background-jobs" },
                  { title: "📊 Dashboard & Admin", value: "admin" },
                ],
              },
            },
          ],
          description: "Select the key features implemented in this project",
        },
        {
          name: "dataSource",
          title: "Data Source",
          type: "string",
          options: {
            list: [
              { title: "💾 Database (Dynamic)", value: "database" },
              { title: "🌐 External API", value: "api" },
              { title: "📄 Static Content", value: "static" },
              { title: "🔄 Real-time Streams", value: "realtime" },
              { title: "📊 Analytics Data", value: "analytics" },
              { title: "🤖 AI Generated", value: "ai-generated" },
              { title: "👥 User Generated", value: "user-generated" },
              { title: "🔗 Hybrid (Multiple Sources)", value: "hybrid" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "iosUrl",
      title: "iOS App Store URL",
      type: "url",
      description: "Link to the iOS App Store listing (mobile projects only)",
    }),
    defineField({
      name: "androidUrl",
      title: "Google Play Store URL",
      type: "url",
      description:
        "Link to the Google Play Store listing (mobile projects only)",
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
    }),
    defineField({
      name: "solution",
      title: "The Solution",
      type: "text",
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Project Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "visible",
      title: "Visible on Website",
      type: "boolean",
      description: "Toggle to show/hide this project on the website",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description:
        "Toggle to include this project in the featured section. Featured projects are automatically sorted by newest first.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "projectType.category",
      complexity: "projectType.complexity",
      media: "mainImage",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      const { title, subtitle, complexity } = selection;
      const categoryEmojis: Record<string, string> = {
        fullstack: "🚀",
        frontend: "⚡",
        static: "🎨",
        mobile: "📱",
        backend: "🔧",
        ai: "🤖",
        devtool: "🛠️",
      };
      const complexityEmojis: Record<string, string> = {
        simple: "🟢",
        moderate: "🟡",
        complex: "🟠",
        enterprise: "🔴",
      };

      const categoryEmoji =
        subtitle && categoryEmojis[subtitle] ? categoryEmojis[subtitle] : "📁";
      const complexityEmoji =
        complexity && complexityEmojis[complexity]
          ? complexityEmojis[complexity]
          : "";
      const categoryText = subtitle || "No Category";

      return {
        title: title || "Untitled Project",
        subtitle: `${categoryEmoji} ${categoryText} ${complexityEmoji}`.trim(),
      };
    },
  },
};

export default projects;
