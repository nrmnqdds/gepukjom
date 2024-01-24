import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const outlets = pgTable("outlets", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	logo: text("logo"),
	state: text("state"),
	fullLocation: text("location"),
	createdAt: text("createdAt").default(sql`now()`),
});
