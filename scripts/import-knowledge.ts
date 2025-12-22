require("dotenv").config();
import xlsx from "xlsx";
import { getDb } from "../lib/db";

async function main() {
  const db = await getDb();

  const workbook = xlsx.readFile("./data/knowledge.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet) as any[];

  if (!rows.length) {
    console.log("No rows found.");
    return;
  }

  await db.collection("knowledge").deleteMany({});
  await db.collection("knowledge").insertMany(rows);

  console.log(`Inserted ${rows.length} knowledge entries`);
}

main()
  .then(() => process.exit(0))
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  });
