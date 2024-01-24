"use client";

import Typewriter from "typewriter-effect";

const Intro = () => {
	return (
		<header className="mx-auto max-w-2xl text-center">
			<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-8xl">
				Ayam Gepuk
			</h1>
			<span className="text-primary font-bold text-3xl sm:text-5xl mt-1">
				<Typewriter
					options={{
						strings: ["Top Global", "Pak Gambus", "Ori Selayang", "Pak Raden"],
						autoStart: true,
						loop: true,
						delay: 50,
						deleteSpeed: 50,
					}}
				/>
			</span>
			<p className="mt-6 text-lg leading-8 text-accent-foreground">
				Best Ayam Gepuk Directory in Malaysia
			</p>
		</header>
	);
};

export default Intro;
