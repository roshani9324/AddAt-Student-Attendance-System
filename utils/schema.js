import { boolean } from "drizzle-orm/gel-core";
import { mysqlTable, varchar, int } from "drizzle-orm/mysql-core";

export const BRANCHES = mysqlTable("branches", {
  id: int("id", { length: 11 }).primaryKey(),
  branch: varchar("branch", { length: 10 }).notNull(),
});

export const STUDENTS = mysqlTable("students", {
  id: int("id", { length: 11 }).autoincrement().primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  contact: varchar("contact", { length: 12 }),
  address: varchar("address", { length: 50 }),
  branch: varchar("branch", { length: 10 }).notNull(),
});

export const ATTENDANCE = mysqlTable("attendance", {
  id: int("id", { length: 11 }).autoincrement().primaryKey(),
  studentId: int("studentId", { length: 11 }).notNull(),
  present: boolean("present").default(false),
  day: int("day", { length: 11 }).notNull(),
  date: varchar("date", { length: 20 }).notNull(),
});
