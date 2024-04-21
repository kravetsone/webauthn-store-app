import wretch from "wretch";

export const api = wretch("https://api.noname.to");

export async function signUp(email: string, password: string) {
	const token = await api.url("/sign-up").post({ email, password }).text();
	localStorage.setItem("token", token);
}

export async function signIn(email: string, password: string) {
	const token = await api.url("/sign-in").post({ email, password }).text();
	localStorage.setItem("token", token);
}

export function storeVault(data: string, updatedAt: string) {
	return api
		.url("/vaults/store")
		.auth(`Bearer ${localStorage.getItem("token")}`)
		.post({ data, updatedAt })
		.json();
}

export function getVault() {
	return api
		.auth(`Bearer ${localStorage.getItem("token")}`)
		.get("/vaults")
		.json<{ success: false } | { updatedAt: string; data: string }>();
}
