"use server";

import { supabase } from "@/lib/supabase";

type TRegisterValues = {
	username: string;
	email: string;
	password: string;
};

/**
 * Creates a new user
 * @param {TRegisterValues} values
 * @returns {Promise<{ success: boolean; message: string }>} Success or error message
 */
export async function CreateUser(
	values: TRegisterValues,
): Promise<{ success: boolean; message: string }> {
	try {
		const { username, email, password } = values;

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
				},
			},
		});

		if (error) {
			return {
				success: false,
				message: error.message,
			};
		}

		return {
			success: true,
			message: "User created",
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
			message: "Unknown error",
		};
	}
}
