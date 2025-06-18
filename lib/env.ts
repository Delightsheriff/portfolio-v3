import { Env } from "@/interface/env";

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID!,
  SANITY_DATASET: process.env.SANITY_DATASET!,
};
