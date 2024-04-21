import { LogDebug } from "../../wailsjs/runtime/runtime";
import { callRPC } from "../backend/utils";
import { Identity } from "../proto";
import { setIdentities } from "../stores";
import { base64ToBytes, bytesToBase64, setImmediate } from "./helpers";

let identities: Identity[] = [];

export async function update() {
	identities = await getIdentities();
	LogDebug(JSON.stringify(identities));

	const withIcons = await Promise.all(
		identities.map((identity) =>
			getFavicon(identity.website.id).then((data) => {
				return { ...identity, icon: data };
			}),
		),
	);

	setIdentities(withIcons);
}

export async function getIdentities(): Promise<Identity[]> {
	const protosRaw = (await callRPC("getIdentities")) as string[];
	const identities = [];
	for (const protoRaw of protosRaw) {
		const protoBytes = base64ToBytes(protoRaw); // Wails events converts bytes to base64
		const id = Identity.fromBinary(protoBytes, {
			readUnknownField: "throw",
		});
		identities.push(id);
	}
	return identities;
}

export async function deleteIdentity(id: Uint8Array) {
	return await callRPC("deleteIdentity", bytesToBase64(id));
}

export async function storeRemoteVault(jsonData: string, lastUpdated: string) {
	console.log(jsonData, lastUpdated);
	await storeRemoteVault(jsonData, lastUpdated);
}

export async function getFavicon(domain: string): Promise<string | null> {
	return await callRPC("getFavicon", domain);
}
