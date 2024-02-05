"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/actions";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
const todayDate = new Date().toISOString().split("T")[1];

export async function LoginUser(values: {
	email: string;
	password: string;
}) {
	const { email, password } = values;
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.log(error);
			throw new Error(error.message);
		}

		revalidatePath("/", "layout");
		redirect("/");
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		if (typeof error === "string") {
			throw new Error(error);
		}

		throw new Error("An error occurred");
	}
}
