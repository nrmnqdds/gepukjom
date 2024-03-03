import CreateForm from "@/components/create-form";

const CreateOutletPage = async () => {
  return (
    <>
      <h1 className="text-5xl font-bold mb-5 sm:mb-10">New Outlet</h1>
      <CreateForm />
    </>
  );
};

export default CreateOutletPage;
