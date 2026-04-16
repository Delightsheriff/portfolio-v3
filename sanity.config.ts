import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";
import { EnvVariables } from "./lib/env";

export default defineConfig({
  name: "default",
  title: "portfolio-v3",

  projectId: EnvVariables.SANITY_PROJECT_ID,
  dataset: EnvVariables.SANITY_DATASET,
  basePath: "/studio",

  plugins: [],

  schema: {
    types: schemaTypes,
  },
});
