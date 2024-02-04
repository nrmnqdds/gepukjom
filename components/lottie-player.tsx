"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function LottiePlayer({
	animationData,
	size,
	className,
	...props
}: {
	animationData: string | Record<string, unknown>;
	size?: number;
	className?: string;
}) {
	return (
		<div
			className={`w-full h-full flex items-center justify-center ${className}`}
			style={{
				width: size ? size * 10 : "100%",
			}}
			{...props}
		>
			<DotLottiePlayer src={animationData} autoplay loop />
		</div>
	);
}
