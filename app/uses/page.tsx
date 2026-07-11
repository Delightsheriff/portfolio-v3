import type { Metadata } from "next";
import { getUses } from "@/sanity/sanity";
import { UsesPage } from "@/components/uses-page";

export const metadata: Metadata = {
  title: "Uses — Tools & Stack",
  description:
    "The tools, editor setup, languages, and services Delight Sheriff uses day-to-day as a full-stack TypeScript engineer.",
  alternates: { canonical: "/uses" },
};

export default async function UsesRoute() {
  const uses = await getUses();
  return <UsesPage uses={uses} />;
}
