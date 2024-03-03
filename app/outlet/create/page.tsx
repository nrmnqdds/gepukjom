import CreateForm from "@/components/create-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const CreateOutletPage = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}
	return (
		<>
			<h1 className="text-5xl font-bold mb-5 sm:mb-10">New Outlet</h1>
			<CreateForm />
		</>
	);
};

export default CreateOutletPage;
