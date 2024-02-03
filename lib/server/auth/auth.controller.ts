import { AuthService } from "./auth.service";

export class AuthController {
	private readonly authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	async register(values: {
		username: string;
		email: string;
		password: string;
	}): Promise<{ success: boolean; message: string }> {
		return this.authService.CreateUser(values);
	}
}
