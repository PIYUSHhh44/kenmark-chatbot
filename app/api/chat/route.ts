export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    console.log("Message received: ", message);

    const db = await getDb();
    console.log("DB connected");

    const knowledgeEntries = await db.collection("knowledge").find().toArray();
    console.log("Rows loaded:", knowledgeEntries.length);

    const lower = message.toLowerCase();
    let match;

    for (const entry of knowledgeEntries) {
      if (entry.Question?.toLowerCase().includes(lower)) {
        match = entry;
        break;
      }
    }

    if (match) {
      console.log("Match found");
      return NextResponse.json({ reply: match.Answer });
    }

    console.log("No match found");
    return NextResponse.json({ reply: "Sorry, I don’t have that information yet." });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: "Internal server error" },
      { status: 500 }
    );
  }
}
