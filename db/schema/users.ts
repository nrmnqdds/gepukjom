import { sql } from "drizzle-orm";
import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: text("email"),
	username: text("username"),
	password: text("password"),
	verified: boolean("verified").default(false),
	verifyToken: text("verifyToken").default(sql`''`),
	sessionToken: text("sessionToken").default(sql`''`),
	createdAt: text("createdAt").default(sql`now()`),
});
