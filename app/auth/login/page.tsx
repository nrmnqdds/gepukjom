import LoginForm from "@/components/auth/login-form";
import LOGO from "@/public/gepukjom.svg";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const RegisterPage = () => {
	return (
		<>
			<div className="flex flex-col gap-5 items-center justify-center">
				<Image
					src={LOGO}
					alt="GepukJom Logo"
					width={100}
					height={100}
					className="object-contain"
				/>
				<h1 className="text-5xl font-bold mb-5 sm:mb-10">Create Account</h1>
				<SignIn />
			</div>
			{/* <LoginForm /> */}
		</>
	);
};

export default RegisterPage;
