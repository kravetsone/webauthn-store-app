import wretch from "wretch";

export const api = wretch("https://api.noname.to/");

export function signUp(email: string, password: string) {
	return api.url("/sign-up").post({ email, password }).json();
}

export function signIn(email: string, password: string) {
	return api.url("/sign-in").post({ email, password }).json();
}

export function storeVault(data: string, updatedAt: string) {
	return api.url("/vaults/store").post({ data, updatedAt }).json();
}
