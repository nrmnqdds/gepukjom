"use server";

import crypto from "crypto";
import { EmailTemplate } from "@/components/email-template";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

type TRegisterValues = {
	username: string;
	email: string;
	password: string;
};

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

const todayDate = new Date().toISOString().split("T")[1];
const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function CreateUser(
	values: TRegisterValues,
): Promise<{ success: boolean; message: string }> {
	try {
		const { username, email, password } = values;

		const { data } = await supabase.from("users").select().eq("email", email);

		if (data && data?.length > 0) {
			return {
				success: false,
				message: "Email already exists.",
			};
		}

		const { data: data2 } = await supabase
			.from("users")
			.select()
			.eq("username", username);

		if (data2 && data2?.length > 0) {
			return {
				success: false,
				message: "Username already taken.",
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const secretKey = `${secret}${todayDate}`;
		const token = crypto.createHmac("sha256", secretKey).digest("hex");

		const { error } = await supabase.from("users").insert([
			{
				username,
				email,
				password: hashedPassword,
				verifyToken: token,
			},
		]);

		if (error) {
			return {
				success: false,
				message: error.message,
			};
		}

		const res = await resend.emails.send({
			from: "GepukJom <gepukjom@nrmnqdds.com>",
			to: [email],
			subject: "GepukJom | Verify Email",
			react: EmailTemplate({
				targetEmail: email,
				token,
				message:
					"Please verify your email address by clicking the button below",
				path: "verify-email",
			}) as React.ReactElement,
		});

		if (res.error) {
			return {
				success: false,
				message: res.error.message,
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
