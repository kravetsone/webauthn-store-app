import { LogDebug, LogError } from "../../../wailsjs/runtime/runtime";
import { setStage } from "../../stores";
import { update } from "../../utils/identities";
import {
	ACCOUNT_VAULT_TYPE,
	LOCAL_VAULT_TYPE,
	getPassphrase,
	setPassphrase,
} from "../../utils/passphrase";
import { getVault, signIn, signUp, storeVault } from "../server";
import { registerHandler } from "../utils";

registerHandler(
	"approveClientAction",
	async (actionString: string, relyingParty?: string, userName?: string) => {
		LogDebug([actionString, relyingParty, userName].join(" "));

		console.log(actionString, relyingParty, userName);
		return true;
	},
);

registerHandler("update", update);

registerHandler(
	"logIn",
	async (vaultType: string, vaultData: string, email: string) => {
		LogDebug([vaultType, vaultData, email, 1].join(" "));
		await signIn("test", "test");
		setStage("profiles");
		setPassphrase("test");
		return false;
	},
);

registerHandler("createNewVault", async () => {
	console.log("TEST");
	setPassphrase("test");
	await signIn("test", "test");

	return [ACCOUNT_VAULT_TYPE, false];
});

registerHandler("getPassphrase", async () => {
	LogDebug("WOW");
	return getPassphrase() || "";
});

registerHandler("fetchRemoteVault", async (d) => {
	LogDebug(d);
	const res = await getVault();
	if ("success" in res) return ["", ""];

	return [res.data, res.updatedAt];
});

registerHandler("storeRemoteVault", async (json_data, lastUpdated) => {
	LogDebug("Stored SOME");
	await storeVault(json_data, lastUpdated);
});

registerHandler("getUserEmail", async () => {
	const email = "test";
	if (!email) {
		LogError(
			"Getting user email when there is no user email to get (maybe not logged in?)",
		);
	}
	return email || "";
});
