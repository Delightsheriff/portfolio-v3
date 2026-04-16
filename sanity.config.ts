import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";
import { EnvVariables } from "./lib/env";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "default",
  title: "portfolio-v3",

  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  basePath: "/studio",

  plugins: [
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
});
