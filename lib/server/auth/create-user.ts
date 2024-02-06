"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/actions";

type TRegisterValues = {
	username: string;
	email: string;
	password: string;
};

export async function CreateUser(values: TRegisterValues) {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { username, email, password } = values;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
				},
			},
		});

		if (error) {
			console.log(error);
			throw new Error(error.message);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			throw new Error(error.message);
		}

		if (typeof error === "string") {
			console.log(error);
			throw new Error(error);
		}

		throw new Error("An error occurred");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
