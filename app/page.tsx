import Intro from "@/components/intro";
import Spotlight from "@/components/ui/spotlight";

const Home = () => {
	return (
		<main className="bg-background relative pt-14 min-h-screen">
			<div className="py-24 sm:py-32 lg:pb-40">
				<Spotlight
					className="-top-40 left-0 md:left-60 md:-top-20"
					fill="white"
				/>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<Intro />
					{/* <div className="mt-16 flow-root sm:mt-24">
						<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
							<img
								src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
								alt="App screenshot"
								width={2432}
								height={1442}
								className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
							/>
						</div>
					</div> */}
				</div>
			</div>
		</main>
	);
};

export default Home;
