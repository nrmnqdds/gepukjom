"use server";

import { supabase } from "@/lib/supabase";

export async function GetSession() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log("user: ", user);
	return user;
}

export async function LogOut() {
	const res = await supabase.auth.signOut();
	console.log("logout: ", res);
	return res;
}
