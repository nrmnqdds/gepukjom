import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as outletSchema from "./schema/outlets";
import * as userSchema from "./schema/users";

const connectionString = process.env.DATABASE_URL as string;

const client = postgres(connectionString);
export const db = drizzle(client, {
	schema: { ...outletSchema, ...userSchema },
});
