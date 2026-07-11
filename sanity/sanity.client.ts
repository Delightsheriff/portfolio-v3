import { createClient, type ClientConfig } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion: "2024-12-16",
  useCdn: false,
};

const client = createClient(config);

export default client;
