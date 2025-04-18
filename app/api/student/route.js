import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.name || !data.branch) {
      return NextResponse.json(
        { error: "Name and Branch are required." },
        { status: 400 }
      );
    }

    const result = await db.insert(STUDENTS).values({
      name: data.name,
      contact: data?.contact,
      address: data?.address,
      branch: data.branch,
    });

    return NextResponse.json(
      { message: "Student added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add student", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const students = await db.select().from(STUDENTS);
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete student record", details: error.message },
      { status: 500 }
    );
  }
}
