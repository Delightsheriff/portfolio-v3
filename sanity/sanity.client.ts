import { createClient, type ClientConfig } from "@sanity/client";
import { EnvVariables } from "@/lib/env";

const config: ClientConfig = {
  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  apiVersion: "2024-12-16",
  useCdn: process.env.NODE_ENV === "production",
};

const client = createClient(config);

export default client;
