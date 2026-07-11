# Plan 004: Enable Sanity CDN in production

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9eaa136..HEAD -- sanity/sanity.client.ts`
> If `sanity/sanity.client.ts` changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `9eaa136`, 2026-07-11

## Why this matters

The Sanity client is configured with `useCdn: false`, which means every query hits the live Sanity API directly. For a public portfolio site where content changes infrequently, this is wasteful: the Sanity CDN caches query results at global edge nodes, reducing latency for visitors (especially outside the US where the API originates) and reducing API usage costs. Content propagation delay on the CDN is at most ~2 seconds after a publish, which is acceptable for a portfolio site. The CDN should be enabled for production builds and disabled only during development or for preview/draft content.

## Current state

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

`useCdn: false` is hardcoded regardless of environment.

This single client is used everywhere — server-side fetches in `sanity/sanity.ts`, the Sanity Studio config at `sanity.config.ts`, and any client-side queries.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Build     | `npm run build`          | Compiled successfully, exit 0 |
| Lint      | `npm run lint`           | exit 0              |

## Scope

**In scope**:
- `sanity/sanity.client.ts` — make `useCdn` conditional on `NODE_ENV`

**Out of scope**:
- `sanity/sanity.ts` — query functions are unchanged
- Any other file

## Git workflow

- Branch from `improve/shadcn-migration`
- Commit message: `perf: enable Sanity CDN in production, keep direct API during dev`
- Do NOT push or open a PR

## Steps

### Step 1: Make `useCdn` environment-aware

In `sanity/sanity.client.ts`, change `useCdn: false` to:

```ts
useCdn: process.env.NODE_ENV === "production",
```

This enables CDN caching when `NODE_ENV` is `"production"` (Vercel builds and `next build`), and disables it during local development (`next dev`) so unpublished changes appear immediately.

The file after the change:
```ts
import { createClient, type ClientConfig } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion: "2024-12-16",
  useCdn: process.env.NODE_ENV === "production",
};

const client = createClient(config);

export default client;
```

**Verify**: `npm run lint` → exit 0

### Step 2: Build to confirm

**Verify**: `npm run build` → `Compiled successfully` (exit 0)

## Test plan

Manual verification:
1. Run `npm run dev` — the site should work locally (no CDN, direct API)
2. Run `npm run build && npm run start` — the production build should work (CDN enabled)
3. Verify content loads correctly in both modes

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "useCdn" sanity/sanity.client.ts` shows `useCdn: process.env.NODE_ENV === "production"`
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside `sanity/sanity.client.ts` are modified

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- `npm run build` fails.
- `process.env.NODE_ENV` is not available in the build environment (it is provided by Next.js automatically).
