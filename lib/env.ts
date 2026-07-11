import { Env } from "@/interface/env";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      `Please add it to your .env.local file.\n` +
      `See .env.example for reference.`,
    );
  }
  return value;
}

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  SANITY_DATASET: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
};
