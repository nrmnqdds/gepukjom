"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
});

const LoginForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const router = useRouter();

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Card className="space-y-2 max-w-md mx-auto drop-shadow-md">
			<CardHeader>
				<CardTitle>Basic Information</CardTitle>
				<CardDescription>
					Please fill in the form below to create an account.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-5">
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input type="text" id="username" {...form.register("username")} />
							{form.formState.errors && (
								<p className="text-red-500 text-sm">
									{form.formState.errors.username?.message}
								</p>
							)}
						</div>
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input
								type="password"
								id="password"
								{...form.register("password")}
							/>
							{form.formState.errors && (
								<p className="text-red-500 text-sm">
									{form.formState.errors.password?.message}
								</p>
							)}
						</div>
					</div>
					<div className="flex flex-row items-center justify-between mt-5">
						<Button
							type="button"
							variant="outline"
							className="font-semibold"
							onClick={() => router.push("/")}
						>
							Cancel
						</Button>
						<Button type="submit" className="font-semibold">
							Login
						</Button>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<p>
					Don&apos;t have an account?{" "}
					<a href="/auth/register" className="text-blue-500 hover:underline">
						Register
					</a>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
