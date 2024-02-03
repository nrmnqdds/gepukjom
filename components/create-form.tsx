import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CreateForm = () => {
	return (
		<Card className="space-y-2">
			<CardHeader>
				<CardTitle>Basic Information</CardTitle>
				<CardDescription>
					Check whether the outlet already registered or create new.
				</CardDescription>
			</CardHeader>

			<div className="mx-5">
				<Separator />
			</div>

			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};

export default CreateForm;
