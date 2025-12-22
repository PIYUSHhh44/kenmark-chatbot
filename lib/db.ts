import { MongoClient, Db } from "mongodb";

const uri = process.env.DATABASE_URL;

if (!uri) {
  throw new Error("❌ DATABASE_URL missing in .env");
}

// Avoid recreating MongoClient in dev/hot reload
let client: MongoClient;
let db: Db;

export async function getDb(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri!);
    await client.connect();
    db = client.db();
    console.log("MongoDB connected");
  }
  return db;
}
