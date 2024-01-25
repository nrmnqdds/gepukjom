import { relations, sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const outlets = pgTable("outlets", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	logo: text("logo"),
	createdAt: text("createdAt").default(sql`now()`),
});

export const branches = pgTable("branches", {
	id: text("id").notNull().primaryKey(),
	state: text("state"),
	fullLocation: text("location"),
	outletId: text("outlet_id")
		.notNull()
		.references(() => outlets.id),
	createdAt: text("createdAt").default(sql`now()`),
});

export const outletRelations = relations(outlets, ({ many }) => ({
	branches: many(branches),
}));

export const branchRelations = relations(branches, ({ one }) => ({
	outlet: one(outlets, {
		fields: [branches.outletId],
		references: [outlets.id],
	}),
}));
