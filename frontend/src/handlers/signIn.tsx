import { ACCOUNT_VAULT_TYPE, LOCAL_VAULT_TYPE } from "../utils/passphrase";
import { LogDebug, LogError } from "../../wailsjs/runtime/runtime";

export async function logInToExistingVault(
    vaultType: string,
    vaultData: string,
    email: string
){
    LogDebug([vaultType, vaultData, email].join(" "))
    return true;
}

export async function logInToRemote() {
    LogDebug("logInToRemote")
    return true;
    
    // return new Promise<boolean>((resolve) => {
    //     showModal(
    //         <LogInModal
    //             onLoggedIn={() => {
    //                 hideModal();
    //                 resolve(true);
    //             }}
    //             onCancel={() => {
    //                 hideModal();
    //                 resolve(false);
    //             }}
    //         />
    //     );
    // });
}
