import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("id").notNull().primaryKey(),
	email: text("email"),
	username: text("username"),
	password: text("password"),
	createdAt: text("createdAt").default(sql`now()`),
});
