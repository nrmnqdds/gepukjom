"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			type="button"
			aria-label="theme-switcher"
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<SunIcon className="h-[1.2rem] w-[1.2rem] text-foreground" />
			) : (
				<MoonIcon className="h-[1.2rem] w-[1.2rem] text-foreground" />
			)}
		</Button>
	);
};

export default ThemeSwitcher;
