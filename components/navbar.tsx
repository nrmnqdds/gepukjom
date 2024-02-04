"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GetSession, LogOut } from "@/lib/server/auth/session";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LOGO from "/public/gepukjom.svg";
import ThemeSwitcher from "./theme-switcher";

const queryClient = new QueryClient();

export default function Navbar() {
	const router = useRouter();

	const { data, isFetching, refetch } = useQuery({
		queryKey: ["user"],
		queryFn: async () => await GetSession(),
	});

	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: async () => await LogOut(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["user"], exact: true });
			refetch();
			router.refresh();
		},
	});

	return (
		<nav className="bg-transparent backdrop-blur-sm w-full border-b border-border fixed top-0 z-50 py-5 px-5 sm:px-24">
			<div className="flex flex-row items-center justify-between">
				<Link
					href="/"
					className="flex flex-row items-center justify-center hover:opacity-80 transition-opacity duration-100"
				>
					<Image
						src={LOGO}
						alt="GepukJom Logo"
						width={40}
						height={40}
						className="mr-2"
					/>
					<h1 className="text-2xl font-bold hidden sm:block">GepukJom</h1>
				</Link>
				{isFetching ? (
					<Skeleton className="w-20 h-5" />
				) : data ? (
					<div className="flex flex-row items-center space-x-5">
						<p>{data.user_metadata.username}</p>
						<Button
							type="button"
							aria-label="logout-button"
							onClick={() => logoutMutation.mutateAsync()}
						>
							Logout
						</Button>
						<ThemeSwitcher />
					</div>
				) : (
					<div className="flex flex-row items-center space-x-5">
						<Link href="/auth/login">
							<Button
								type="button"
								aria-label="login-button"
								className="font-semibold"
							>
								Login
							</Button>
						</Link>
						<Link href="/auth/register">
							<Button
								type="button"
								aria-label="register-button"
								className="font-semibold"
							>
								Register
							</Button>
						</Link>
						<ThemeSwitcher />
					</div>
				)}
			</div>
		</nav>
	);
}
