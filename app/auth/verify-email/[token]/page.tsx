import VerificationCard from "@/components/auth/verification-card";

const VerifyEmailPage = ({ params }: { params: { token: string } }) => {
	return (
		<main className="bg-background w-full min-h-screen relative isolate px-10 pt-40 sm:p-32 lg:p-40">
			<div className="max-w-2xl mx-auto">
				<h1 className="font-knockout text-5xl tracking-wider font-bold text-center mb-5 sm:mb-10">
					ACCOUNT VERIFICATION
				</h1>
				<VerificationCard token={params.token} />
			</div>
		</main>
	);
};

export default VerifyEmailPage;
