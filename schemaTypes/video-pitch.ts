import { defineField } from "sanity";

const videoPitch = {
  name: "videoPitch",
  title: "Video Pitch",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Video Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g., "2:15" or "3 min"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics Covered",
      type: "array",
      of: [{ type: "string" }],
      description: "Key topics or themes covered in the video",
    }),
    defineField({
      name: "enabled",
      title: "Show Video Section",
      type: "boolean",
      description: "Toggle to show/hide the video pitch section",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "youtubeUrl",
      description: "description",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      const { title, subtitle } = selection;
      const isShorts = subtitle?.includes("/shorts/");
      return {
        title: title,
        subtitle: `${isShorts ? "📱 Shorts" : "🎥 Video"} - ${subtitle}`,
      };
    },
  },
};

export default videoPitch;
