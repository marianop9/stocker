import { _pbService } from '$lib/pocketbase';

interface IAuthService {
	login(email: string, password: string): Promise<boolean>;
	logout(): void;
}

export const authService: IAuthService = {
	login: async function (email: string, password: string): Promise<boolean> {
		try {
			await _pbService.users.authWithPassword(email, password);
		} catch (e) {
			console.error(e);
			return false;
		}

		return true;
	},
	logout: function () {
		_pbService.authStore.clear();
	}
};
