# Plan 005: Add runtime validation for required environment variables

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9eaa136..HEAD -- lib/env.ts sanity/sanity.client.ts`
> If either file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: correctness
- **Planned at**: commit `9eaa136`, 2026-07-11

## Why this matters

Two files silently accept missing or invalid environment variables:

1. `lib/env.ts` uses non-null assertions (`!`) on `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` and `process.env.NEXT_PUBLIC_SANITY_DATASET`. If either var is missing, the value becomes `undefined` cast to `string` — which becomes the literal string `"undefined"` when used. The Sanity client then tries to connect to project `"undefined"` and fails with a confusing API error.

2. `sanity/sanity.client.ts` falls back to `"dummy-project-id"` if the env var is missing. This masks configuration issues — a developer missing their `.env.local` file gets a cryptic Sanity API error instead of a clear message about the missing env var.

## Current state

**`lib/env.ts`** (full file, 6 lines):
```ts
import { Env } from "@/interface/env";

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET!,
};
```

**`sanity/sanity.client.ts`** (full file, 15 lines):
```ts
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
```

**`interface/env.ts`** (for reference):
```ts
export interface Env {
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
}
```

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Build     | `npm run build`          | Compiled successfully, exit 0 |
| Lint      | `npm run lint`           | exit 0              |

## Scope

**In scope**:
- `lib/env.ts` — add runtime validation with clear error messages
- `sanity/sanity.client.ts` — remove the silent fallback; the env var validator already handles this
- `interface/env.ts` — update if needed (likely no change)

**Out of scope**:
- `sanity.config.ts` — uses `EnvVariables` and will benefit automatically
- Any other file

## Git workflow

- Branch from `improve/shadcn-migration`
- Commit message: `fix: add runtime validation for required Sanity env variables`
- Do NOT push or open a PR

## Steps

### Step 1: Add runtime validation to `lib/env.ts`

Replace the file content with a validated version:

```ts
import { Env } from "@/interface/env";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      `Please add it to your .env.local file.\n` +
      `See .env.example for reference.`
    );
  }
  return value;
}

export const EnvVariables: Env = {
  SANITY_PROJECT_ID: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  SANITY_DATASET: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
};
```

This throws a clear error at startup (build time for server components, or first access for client) instead of propagating `"undefined"` as a project ID.

Note: `process.env[name]` is used instead of `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` directly to keep the function generic. The `name` parameter is a string literal in the call, so it gets inlined by the bundler.

**Verify**: `npm run lint` → exit 0

### Step 2: Remove fallback values from `sanity/sanity.client.ts`

Replace the fallback pattern with direct usage of `EnvVariables`:

```ts
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
```

Note: The `projectId`/`dataset` local variables and the fallback `||` operators are removed. `useCdn` change from plan 004 is included here for consistency (if 004 hasn't been applied yet, include this change; if 004 was already applied, keep `useCdn: process.env.NODE_ENV === "production"`).

**Verify**: `npm run lint` → exit 0

### Step 3: Build to confirm

**Verify**: `npm run build` → `Compiled successfully` (exit 0)

## Test plan

Manual verification:
1. Temporarily rename `.env.local` to `.env.local.bak`
2. Run `npm run dev` — should fail with a clear error: `Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Restore `.env.local`
4. Run `npm run dev` — should start normally

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "throw new Error" lib/env.ts` shows the validation function
- [ ] `grep -n "dummy-project-id" sanity/sanity.client.ts` returns no matches
- [ ] `grep -n 'process\.env\.NEXT_PUBLIC_SANITY.*!' lib/env.ts` returns no matches
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- `npm run build` fails.
- The `EnvVariables` object is used in a way that can't be replaced by the validated version (e.g. if something depends on the fallback values being strings rather than throwing).
