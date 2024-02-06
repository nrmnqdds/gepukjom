import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LOGO from "/public/gepukjom.svg";
import ThemeSwitcher from "./theme-switcher";

export default async function Navbar() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.getUser();

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
				{data?.user ? (
					<div className="flex flex-row items-center space-x-5">
						<p>{data.user.user_metadata.username}</p>
						<Button type="button" aria-label="logout-button">
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
