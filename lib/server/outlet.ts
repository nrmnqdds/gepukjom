"use server";

import { supabase } from "@/lib/supabase";

export async function GetAllOutlets() {
	const { data, error } = await supabase.from("outlets").select();
	if (error) {
		throw error;
	}
	return data;
}
