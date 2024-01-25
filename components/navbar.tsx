import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import LOGO from "/public/gepukjom.svg";
import ThemeSwitcher from "./theme-switcher";

export default function Navbar() {
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
				<div className="flex flex-row items-center justify-between gap-2">
					<Button
						type="button"
						aria-label="login-button"
						className="font-semibold"
					>
						Login
					</Button>
					<ThemeSwitcher />
				</div>
			</div>
		</nav>
	);
}
