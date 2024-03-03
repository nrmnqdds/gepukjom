import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
		"/outlet/create",
	],
};
