"use server";

import { AuthController } from "@/lib/server/auth/auth.controller";

const authController = new AuthController();

export async function CreateUser(
	username: string,
	email: string,
	password: string,
): Promise<{ success: boolean; message: string }> {
	return await authController.register({ username, email, password });
}
