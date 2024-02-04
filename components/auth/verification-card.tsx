"use client";

import LottiePlayer from "@/components/lottie-player";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { VerifyEmail } from "@/lib/server/auth/verify-email";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";

const VerificationCard = ({ token }: { token: string }) => {
	const { toast } = useToast();

	const { data, isSuccess, isError } = useQuery({
		queryKey: ["verify-email", token],
		queryFn: async () => {
			const res = await VerifyEmail(token);
			if (res.success) {
				toast({
					title: "Account Verified!",
					description: "You can now login to your account.",
				});
			} else {
				toast({
					title: "Verification Failed!",
					description: "The verification link is invalid or expired.",
					variant: "destructive",
				});
			}
			return res;
		},
		refetchOnWindowFocus: false,
	});

	return (
		<Card className="space-y-2 max-w-2xl mx-auto">
			<CardHeader>
				<h2
					className={clsx("text-2xl text-center font-bold", {
						"text-green-500": data?.success,
						"text-red-500": !data?.success,
					})}
				>
					{data?.success
						? "Account Verified!"
						: !data?.success || isError
						  ? "Verification Failed!"
						  : "Verifying Account..."}
				</h2>
			</CardHeader>
			<CardContent>
				<LottiePlayer
					animationData={require("../../public/lottie/chicken_running.lottie")}
					size={30}
					className="mx-auto"
				/>
			</CardContent>
			{data?.success && (
				<CardFooter>
					<p className="text-center">
						Your account has been verified. You can now{" "}
						<Link href="/auth/login" className="text-blue-600 hover:underline">
							login
						</Link>{" "}
						to your account.
					</p>
				</CardFooter>
			)}
		</Card>
	);
};

export default VerificationCard;
