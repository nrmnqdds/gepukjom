import CreateForm from "@/components/create-form";
import React from "react";

const CreateOutletPage = () => {
	return (
		<main className="bg-background w-full min-h-screen relative isolate p-24 sm:p-32 lg:p-40">
			<h1 className="text-5xl font-bold mb-5 sm:mb-10">New Outlet</h1>
			<CreateForm />
		</main>
	);
};

export default CreateOutletPage;
