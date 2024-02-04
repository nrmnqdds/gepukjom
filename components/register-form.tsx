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
import { useToast } from "@/components/ui/use-toast";
import { CreateUser } from "@/lib/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z
	.object({
		email: z.string().email({
			message: "Invalid email address.",
		}),
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		password: z.string().min(4, {
			message: "Password must be at least 4 characters.",
		}),
		confirmPassword: z.string().min(4, {
			message: "Password must be at least 4 characters.",
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match.",
				path: ["confirmPassword"],
			});
		}
	});

const RegisterForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { toast } = useToast();

	const registerMutation = useMutation({
		mutationKey: ["register"],
		mutationFn: async (values: z.infer<typeof formSchema>) =>
			await CreateUser(values),
		onSuccess: (data) => {
			if (data.success) {
				toast({
					title: "Account Created",
					description: "Please check your email to verify your account.",
				});
				router.push("/auth/login");
			} else {
				toast({
					title: "Error",
					description: data.message,
					variant: "destructive",
				});
			}
		},
	});

	const router = useRouter();

	function onSubmit(values: z.infer<typeof formSchema>) {
		registerMutation.mutateAsync(values);
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
							<Label htmlFor="email">Email</Label>
							<Input type="email" id="email" {...form.register("email")} />
							{form.formState.errors && (
								<p className="text-red-500 text-sm">
									{form.formState.errors.email?.message}
								</p>
							)}
						</div>
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
						<div className="space-y-1">
							<Label htmlFor="password">Confirm Password</Label>
							<Input
								type="password"
								id="confirm-password"
								{...form.register("confirmPassword")}
							/>
							{form.formState.errors && (
								<p className="text-red-500 text-sm">
									{form.formState.errors.confirmPassword?.message}
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
						<Button
							type="submit"
							className="font-semibold"
							disabled={registerMutation.isPending}
						>
							{registerMutation.isPending ? "Loading" : "Register"}
						</Button>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<p>
					Already have an account?{" "}
					<a href="/auth/login" className="text-blue-500 hover:underline">
						Login
					</a>
				</p>
			</CardFooter>
		</Card>
	);
};

export default RegisterForm;
