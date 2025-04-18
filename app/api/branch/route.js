import { db } from "@/utils";
import { BRANCHES } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.select().from(BRANCHES);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
