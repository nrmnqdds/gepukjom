import { db } from "@/db";
import { users } from "@/db/schema/users";

type TRegisterValues = {
	username: string;
	email: string;
	password: string;
};

export class AuthService {
	async CreateUser(
		values: TRegisterValues,
	): Promise<{ success: boolean; message: string }> {
		try {
			const { username, email, password } = values;
			const user = await db.query.users.findFirst({
				with: {
					email,
				},
			});

			if (user) {
				return {
					success: false,
					message: "Email already exists",
				};
			}

			await db.insert(users).values({
				username,
				email,
				password,
			});

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
}
