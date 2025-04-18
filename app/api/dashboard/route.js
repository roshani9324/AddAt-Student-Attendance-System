import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get("date");
    const branch = searchParams.get("branch");

    const result = await db
      .select({
        day: ATTENDANCE.day,
        presentCount: sql`count(${ATTENDANCE.day})`,
      })
      .from(ATTENDANCE)
      .leftJoin(
        STUDENTS,
        and(eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date, date))
      )
      .where(eq(STUDENTS.branch, branch))
      .groupBy(ATTENDANCE.day)
      .orderBy(desc(ATTENDANCE.day))
      .limit(7);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
