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
import { LoginUser } from "@/lib/server/auth/login-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	email: z.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
});

const LoginForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { toast } = useToast();
	const router = useRouter();

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: async (values: z.infer<typeof formSchema>) =>
			await LoginUser(values),
		onSuccess: () =>
			toast({
				title: "Logged in",
				description: "You have been successfully logged in.",
			}),
		onError: (err) =>
			toast({
				title: "An error occured",
				description: err.message,
				variant: "destructive",
			}),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		loginMutation.mutateAsync(values);
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
						<Button
							type="submit"
							className="font-semibold"
							disabled={loginMutation.isPending}
						>
							{loginMutation.isPending ? "Logging in..." : "Log In"}
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
