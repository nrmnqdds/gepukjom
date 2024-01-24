"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LOGO from "/public/gepukjom.svg";

export default function Navbar() {
	const [state, setState] = useState<boolean>(false);

	const menus = [
		{ title: "Home", path: "/your-path" },
		{ title: "Blog", path: "/your-path" },
		{ title: "About Us", path: "/your-path" },
		{ title: "Contact Us", path: "/your-path" },
	];

	return (
		<nav className="bg-zinc-950 w-full border-b border-border fixed top-0 z-50">
			<div className="items-center justify-between px-4 max-w-screen-xl mx-auto md:flex md:px-8">
				<div className="flex items-center justify-between py-3 md:py-5 md:block">
					<Link href="/" className="hover:opacity-80">
						<Image
							src={LOGO}
							alt="Ayam Gepuk Logo"
							width={50}
							height={50}
							priority
						/>
					</Link>
					<div className="md:hidden">
						<button
							type="button"
							className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
							onClick={() => setState(!state)}
						>
							<Menu />
						</button>
					</div>
				</div>
				<div
					className={`pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
						state ? "block" : "hidden"
					}`}
				>
					<ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
						{menus.map((item, idx) => (
							<li
								key={`${item.title}-${idx}`}
								className="text-primary hover:text-secondary h-full text-lg"
							>
								<Link href={item.path}>{item.title}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}
