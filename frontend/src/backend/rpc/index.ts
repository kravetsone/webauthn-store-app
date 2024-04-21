import { LogDebug, LogError } from "../../../wailsjs/runtime/runtime";
import { setStage } from "../../stores";
import { update } from "../../utils/identities";
import {
	ACCOUNT_VAULT_TYPE,
	LOCAL_VAULT_TYPE,
	getPassphrase,
} from "../../utils/passphrase";
import { signIn, signUp } from "../server";
import { registerHandler } from "../utils";

registerHandler(
	"approveClientAction",
	async (actionString: string, relyingParty?: string, userName?: string) => {
		console.log(actionString, relyingParty, userName);
		return true;
	},
);

registerHandler("update", update);

registerHandler(
	"logIn",
	async (vaultType: string, vaultData: string, email: string) => {
		LogDebug([vaultType, vaultData, email].join(" "));
		await signIn(email, "test");
		setStage("profiles");
		return false;
	},
);

registerHandler("createNewVault", async () => {
	console.log("TEST");

	return [ACCOUNT_VAULT_TYPE, false];
});

registerHandler("getPassphrase", async () => {
	LogDebug("WOW");
	return getPassphrase() || "";
});

registerHandler("fetchRemoteVault", async (d) => {
	LogDebug(d);
	return ["", ""];
});

registerHandler("storeRemoteVault", async (d) => {
	LogDebug("Stored");
	LogDebug(d);
});

registerHandler("getUserEmail", async () => {
	const email = "example@example.com";
	if (!email) {
		LogError(
			"Getting user email when there is no user email to get (maybe not logged in?)",
		);
	}
	return email || "";
});
