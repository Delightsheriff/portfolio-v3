import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID!,
  dataset: process.env.SANITY_API_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const VISIBLE_DOC_TYPES = ["project", "blog", "projectGroup"];

async function migrate() {
  for (const docType of VISIBLE_DOC_TYPES) {
    const docs = await client.fetch(
      `*[_type == $docType && !defined(visible)] { _id, _type }`,
      { docType },
    );

    console.log(`Found ${docs.length} ${docType} docs without visible field.`);

    const transaction = client.transaction();
    for (const doc of docs) {
      transaction.patch(doc._id, { set: { visible: true } });
    }

    if (docs.length > 0) {
      await transaction.commit();
      console.log(`Patched ${docs.length} ${docType} docs.`);
    }
  }

  console.log("Migration complete.");
}

migrate().catch(console.error);
