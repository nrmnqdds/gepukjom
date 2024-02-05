import type { Database } from "@/types/database.types";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	return createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
	);
}
