import { LogDebug } from "wailsjs/runtime/runtime";
import { registerHandler,  } from "../utils";
import {getPassphrase} from "../../utils/passphrase"
// import * as identities from "../data/identities";
// import { approveClientAction } from "./ApproveAction";
// import { createNewVault } from "./signup/CreateAccount";
// import { getPassphrase } from "../data/passphrase";
// import { logInToExistingVault } from "./signup/LogIn";
// import * as supabase from "../data/supabase";
// import { LogError } from "../wailsjs/runtime/runtime";

// registerHandler("approveClientAction", approveClientAction);

// registerHandler("update", identities.update);

registerHandler("logIn", async (d) => {
    LogDebug(d);
    return false
});

// registerHandler("createNewVault", createNewVault);

registerHandler("getPassphrase", async () => {
    return getPassphrase() || "";
});

// registerHandler("fetchRemoteVault", identities.fetchRemoteVault);

// registerHandler("storeRemoteVault", identities.storeRemoteVault);

// registerHandler("getUserEmail", async () => {
//     const email = await supabase.getEmail();
//     if (!email) {
//         LogError(
//             "Getting user email when there is no user email to get (maybe not logged in?)"
//         );
//     }
//     return email || "";
// });