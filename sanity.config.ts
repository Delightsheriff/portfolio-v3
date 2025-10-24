import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { EnvVariables } from "./lib/env";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "default",
  title: "portfolio-v3",

  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  basePath: "/studio",

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
