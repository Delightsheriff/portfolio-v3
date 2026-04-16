export default function Studio() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24 text-center">
      <div className="max-w-lg space-y-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Studio is unavailable in this build
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          The portfolio app no longer bundles the Sanity Studio runtime during
          production builds. If you need to manage content, run the studio in a
          separate workspace or restore the CMS dependencies.
        </p>
      </div>
    </main>
  );
}
