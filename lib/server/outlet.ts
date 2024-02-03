"use server";

import { db } from "@/db";
import { outlets } from "@/db/schema/outlets";

export async function GetAllOutlets() {
	const res = await db.select().from(outlets);
	return res;
}
