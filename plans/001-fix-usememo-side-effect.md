# Plan 001: Fix `useMemo` side-effect in ProjectFilter

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9eaa136..HEAD -- components/project-filter.tsx`
> If `components/project-filter.tsx` changed since this plan was written, compare the
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

`useMemo` is for pure computations that return a value. Calling `onFilterChange()` (a state-updating callback) inside `useMemo` runs it during the render phase as a side-effect. React may fire this side-effect more often than expected (e.g. during development with StrictMode, `useMemo` callbacks run twice), and calling `setState` on the parent during render can trigger cascading re-renders or infinite loops. The correct hook for side-effects that run after render is `useEffect`.

## Current state

- `components/project-filter.tsx` — the `ProjectFilter` component (168 lines)
- Lines 41–78 contain:
  ```ts
  useMemo(() => {
    let filtered = projects;
    // ... filtering logic ...
    onFilterChange(filtered, filteredGroups);
  }, [selectedTechs, selectedTypes, projects, groups, onFilterChange]);
  ```
  The return value of `useMemo` is unused — the callback is only there for its side-effect of calling `onFilterChange`.

- The repo uses standard React hooks pattern elsewhere (see `useEffect` for async operations in `navbar.tsx`, `go-back.tsx`).

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Build     | `npm run build`          | Compiled successfully, exit 0 |
| Lint      | `npm run lint`           | exit 0              |

## Scope

**In scope** (the only files you should modify):
- `components/project-filter.tsx`

**Out of scope** (do NOT touch, even though they look related):
- Any other component file
- The filtering logic itself — only change which hook is used

## Git workflow

- Branch from `improve/shadcn-migration`
- Commit message: `fix: replace useMemo side-effect with useEffect in ProjectFilter`
- Do NOT push or open a PR

## Steps

### Step 1: Replace `useMemo` with `useEffect`

In `components/project-filter.tsx`:

1. Change the import from `useMemo` to `useEffect`:
   ```ts
   import { useState, useEffect } from "react";
   ```

2. Replace the `useMemo` call with `useEffect`:
   ```ts
   useEffect(() => {
     let filtered = projects;
     // ... (the filtering logic stays exactly the same) ...
     onFilterChange(filtered, filteredGroups);
   }, [selectedTechs, selectedTypes, projects, groups, onFilterChange]);
   ```

   The filtering body (lines 42–77) stays identical — only the hook wrapper changes.

**Verify**: `npm run lint` → exit 0

### Step 2: Confirm there is no unused-import warning

Run `npm run build` to confirm.

**Verify**: `npm run build` → `Compiled successfully` (exit 0)

## Test plan

No tests exist in this repo yet. Manual verification:
1. Open `/projects` page in the browser
2. Click a tech filter button → the project list should filter
3. Click a type filter button → the project list should filter
4. Click "Clear filters" → all projects should reappear
5. No React warnings in the console (especially about state updates during render)

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0 with `Compiled successfully`
- [ ] `grep -rn "useMemo" components/project-filter.tsx` returns no matches
- [ ] No files outside `components/project-filter.tsx` are modified (`git status`)

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- `npm run build` fails with type errors.
- The filtering logic inside the hook has drifted from the plan's description.

## Maintenance notes

- If a proper test suite is ever added, `ProjectFilter`'s filtering logic should be extracted into a pure utility function that can be unit-tested independently.
