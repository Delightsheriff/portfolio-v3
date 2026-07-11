# Plan 003: Add missing `openToWork` field to hero GROQ query

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9eaa136..HEAD -- sanity/sanity.ts`
> If `sanity/sanity.ts` changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `9eaa136`, 2026-07-11

## Why this matters

The hero Sanity schema (`schemaTypes/hero.ts:58-64`) defines an `openToWork` boolean field. The `Hero` TypeScript interface (`interface/sanity.ts:79`) correctly declares `openToWork?: boolean`. The `hero.tsx` component (lines 77-84) renders an "Open to opportunities" badge conditionally: `{hero?.openToWork && (...)}`. But the GROQ query in `getHero()` (`sanity/sanity.ts:197-207`) never fetches the `openToWork` field, so `hero.openToWork` is always `undefined` (falsy) and the badge **never displays**, regardless of the CMS setting.

## Current state

**`sanity/sanity.ts` lines 196–207** — the `getHero()` GROQ query:
```ts
const hero = await client.fetch(`
  *[_type == "hero"][0] {
    headline,
    subheadline,
    ctaText,
    ctaLink,
    status,
    location,
    stackPills
  }
`);
```

`openToWork` is absent from the projection.

**`components/hero.tsx` lines 77–84** — the consumer:
```tsx
{hero?.openToWork && (
  <div className="px-3 py-1 rounded-full border border-highlight/30 bg-highlight/5 flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-highlight" aria-hidden="true" />
    <span className="text-xs font-mono uppercase tracking-[0.2em] text-highlight">
      Open to opportunities
    </span>
  </div>
)}
```

The check is correct — the data simply never arrives.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Build     | `npm run build`          | Compiled successfully, exit 0 |
| Lint      | `npm run lint`           | exit 0              |

## Scope

**In scope**:
- `sanity/sanity.ts` — add `openToWork` to the GROQ projection

**Out of scope**:
- `interface/sanity.ts` — the `Hero` type already has the field
- `components/hero.tsx` — the conditional render is correct
- Any other query or component

## Git workflow

- Branch from `improve/shadcn-migration`
- Commit message: `fix: add missing openToWork field to hero GROQ query`
- Do NOT push or open a PR

## Steps

### Step 1: Add `openToWork` to the query projection

In `sanity/sanity.ts`, find the `getHero()` function (around line 196). Add `openToWork` after `stackPills` in the GROQ projection:

```ts
*[_type == "hero"][0] {
  headline,
  subheadline,
  ctaText,
  ctaLink,
  status,
  location,
  stackPills,
  openToWork
}
```

**Verify**: `npm run lint` → exit 0

### Step 2: Build to confirm

**Verify**: `npm run build` → `Compiled successfully` (exit 0)

## Test plan

Manual verification:
1. Go to Sanity Studio (`/studio`)
2. Edit the hero document and set "Open to work" to `true`
3. Publish the change
4. Open the home page (may need to wait for ISR cache, or append `?` to force fresh)
5. The "Open to opportunities" badge should appear below the status text
6. Set "Open to work" back to `false` and publish — badge should disappear

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "openToWork" sanity/sanity.ts` returns a match in the GROQ query body
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside `sanity/sanity.ts` are modified

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- `npm run build` fails.
- The `getHero()` function signature or surrounding code has been refactored since this plan was written.
