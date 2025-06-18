import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { EnvVariables } from "./lib/env";

console.log("Sanity Project ID:", EnvVariables.SANITY_PROJECT_ID);
console.log("Sanity Dataset:", EnvVariables.SANITY_DATASET);

export default defineConfig({
  name: "default",
  title: "portfolio-v3",

  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
