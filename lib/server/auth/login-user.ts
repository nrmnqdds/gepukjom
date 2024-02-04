"use server";

import { supabase } from "@/lib/supabase";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
const todayDate = new Date().toISOString().split("T")[1];

export async function LoginUser(values: {
	email: string;
	password: string;
}) {
	const { email, password } = values;
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.log(error);
			return {
				success: false,
				message: error.message,
			};
		}

		return {
			success: true,
			message: "Logged in",
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			};
		}

		if (typeof error === "string") {
			return {
				success: false,
				message: error,
			};
		}

		return {
			success: false,
			message: "An error occurred",
		};
	}
}
