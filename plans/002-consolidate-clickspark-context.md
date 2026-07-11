# Plan 002: Consolidate duplicate `ClickSparkContext` definitions

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9eaa136..HEAD -- components/animations/spark-button.tsx components/animations/spark-next-link.tsx`
> If either file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: MED (spark effects may show React warnings if done wrong)
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `9eaa136`, 2026-07-11

## Why this matters

`ClickSparkContext` is defined in TWO files: `spark-button.tsx:9` and `spark-next-link.tsx:11`. Both define an identical React context with the same type. The `ClickSparkProvider` (`components/animations/click-spark-provider.tsx:4`) imports `ClickSparkContext` from `spark-button.tsx` and provides values to it. But `SparkNextLink` (`spark-next-link.tsx:33`) calls `useContext(ClickSparkContext)` using its own **local** `ClickSparkContext` definition — not the one from `spark-button.tsx`. This means `SparkNextLink` **never sees the provider's value**, so `addSpark` is always `null` and sparks never fire when clicking `SparkNextLink` elements (navbar links, "Back" button, logo).

## Current state

**`components/animations/spark-button.tsx`** (lines 5–17):
```ts
export interface ClickSparkContextType {
  addSpark: (x: number, y: number) => void;
}

export const ClickSparkContext = React.createContext<ClickSparkContextType | null>(null);

export function useClickSparks() {
  const context = useContext(ClickSparkContext);
  if (!context) {
    throw new Error('useClickSparks must be used within ClickSparkProvider');
  }
  return context;
}
```

**`components/animations/spark-next-link.tsx`** (lines 7–19) — defines ITS OWN copy:
```ts
interface ClickSparkContextType {
  addSpark: (x: number, y: number) => void;
}

export const ClickSparkContext = React.createContext<ClickSparkContextType | null>(null);

export function useClickSparks() {
  const context = useContext(ClickSparkContext);
  if (!context) {
    throw new Error('useClickSparks must be used within ClickSparkProvider');
  }
  return context;
}
```

**`components/animations/click-spark-provider.tsx`** (line 4):
```ts
import { ClickSparkContext } from './spark-button';
```

The provider provides via `spark-button.tsx`'s context, but `SparkNextLink` reads from `spark-next-link.tsx`'s context — they are different instances.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Build     | `npm run build`          | Compiled successfully, exit 0 |
| Lint      | `npm run lint`           | exit 0              |

## Scope

**In scope**:
- `components/animations/spark-next-link.tsx`
- `components/animations/spark-button.tsx` (read-only reference — do not modify)

**Out of scope**:
- `components/animations/click-spark-provider.tsx` — already correctly imports from `spark-button.tsx`
- `components/animations/click-spark.tsx`
- Any component that uses `SparkNextLink` or `SparkLink` — imports must update, but the fix is just changing the import source

## Git workflow

- Branch from `improve/shadcn-migration`
- Commit message: `fix: consolidate duplicate ClickSparkContext into spark-button.tsx`
- Do NOT push or open a PR

## Steps

### Step 1: Remove duplicate exports from `spark-next-link.tsx`

Replace the entire content of `components/animations/spark-next-link.tsx` with imports from `spark-button.tsx`:

```ts
'use client';

import React, { useContext, ReactNode } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import {
  ClickSparkContext,
  ClickSparkContextType,
} from './spark-button';

interface SparkNextLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export function SparkNextLink({
  children,
  onClick,
  className,
  ...props
}: SparkNextLinkProps) {
  const sparkContext = useContext(ClickSparkContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (sparkContext?.addSpark) {
      sparkContext.addSpark(e.clientX, e.clientY);
    }
    onClick?.(e);
  };

  return (
    <Link onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
```

Note: `ClickSparkContextType` is imported for type reference. The `useClickSparks` export from `spark-next-link.tsx` is not used anywhere (verify with `grep` later), but if it is used, those imports should be updated to point to `spark-button.tsx`.

**Verify**: `grep -rn "useClickSparks" components/animations/spark-next-link.tsx` → only the export line (before removal). If called externally, update imports.

### Step 2: Update any imports that point to the old location

Run: `grep -rn "from.*spark-next-link.*ClickSparkContext\|from.*spark-next-link.*useClickSparks" components/`

If any results show up, update those imports to source from `./spark-button` instead.

**Verify**: `npm run lint` → exit 0

### Step 3: Build to confirm

**Verify**: `npm run build` → `Compiled successfully` (exit 0)

## Test plan

Manual verification:
1. Open the home page
2. Click any `SparkNextLink` element (navbar links, "DS." logo, "Back" buttons on inner pages) — spark particles should appear at the click location
3. Click any `SparkLink` element (project CTAs, social links) — sparks should still work
4. No errors in the browser console

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "^export.*ClickSparkContext\|^export.*useClickSparks" components/animations/spark-next-link.tsx` returns no matches
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- `npm run build` fails with type errors about `ClickSparkContext` or `ClickSparkContextType` not being exported from `spark-button.tsx`.
- Any component outside the in-scope files needs modification (import path updates to `SparkNextLink` consumers are OK since they import `SparkNextLink` itself unchanged).

## Maintenance notes

- If the `ClickSparkContextType` interface ever needs to change, it now lives in one place (`spark-button.tsx`).
- If a future contributor adds another spark-enabled component, they should import `ClickSparkContext` from the single source.
