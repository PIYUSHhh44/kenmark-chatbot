require("dotenv").config();

import { getDb } from "../lib/db";

async function main() {
  const db = await getDb();
  const count = await db.collection("knowledge").countDocuments();
  console.log("Knowledge count:", count);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
