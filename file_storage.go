package main

import (
	"encoding/json"
	"os"
	"path/filepath"
)

var localVaultType string = "local"
var accountVaultType string = "account"

type VaultFile struct {
	VaultType   string `json:"type"`
	Data        []byte `json:"data"`
	LastUpdated string `json:"last_updated"`
	Email       string `json:"email"`
	Favicons    []byte `json:"favicons,omitempty"`
}

func configDir() string {
	configDirRoot, err := os.UserConfigDir()
	checkErr(err, "Could not get user config directory")
	return filepath.Join(configDirRoot, "Bulwark Passkey")
}

func vaultFilename() string {
	return configFilePath("vault.json")
}

func configFilePath(filename string) string {
	configDir := configDir()
	print(229, configDir)
	return filepath.Join(configDir, filename)
}

func saveVaultToFile(vaultFile VaultFile) {
	data, err := json.Marshal(vaultFile)
	checkErr(err, "Could not serialize JSON")
	configDir := configDir()
	err = os.Mkdir(configDir, 0700)
	if !os.IsExist(err) {
		checkErr(err, "Could not create config directory")
	}
	err = os.WriteFile(vaultFilename(), data, 0700)
	checkErr(err, "Could not write vault file")
}

func readVaultFromFile() *VaultFile {
	data, err := os.ReadFile(vaultFilename())
	if os.IsNotExist(err) {
		return nil
	}
	checkErr(err, "Could not read vault data")
	var vaultFile VaultFile
	err = json.Unmarshal(data, &vaultFile)
	checkErr(err, "Could not deserialize vault file")
	return &vaultFile
}

func deleteVaultFile() {
	err := os.Remove(vaultFilename())
	if os.IsNotExist(err) {
		return
	}
	checkErr(err, "Could not delete vault file")
}
