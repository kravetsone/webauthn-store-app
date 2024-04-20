package main

import (
	"context"
	"fmt"
	"time"
)

var app *App

// App struct
type App struct {
	ctx         context.Context
	client      *Client
	fidoStarted bool
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{fidoStarted: false}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
	app.client = newClient()
}

// Greet returns a greeting for the given name
func (app *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (app *App) createNewVault() {
	vaultType, loggedIn := createNewVault()
	if loggedIn {
		// Fetch remote vault
		jsonData, lastUpdated := fetchRemoteVaultJSON()
		if jsonData == "" {
			// Fetch returned no vault on remote servers
			app.client.configureNewDevice(accountVaultType)
		} else {
			app.client.loadData(accountVaultType, []byte(jsonData), lastUpdated, getUserEmail())
		}
	} else {
		app.client.configureNewDevice(vaultType)
	}
}

func (app *App) updateRemoteVault() {
	jsonData, lastUpdated := fetchRemoteVaultJSON()
	if jsonData != "" && lastUpdated != "" && jsonData != "Error" {
		// TODO: Have better error interface for vault updates (error, network error, no data, vault data)
		app.client.updateData([]byte(jsonData), lastUpdated)
	}
}

func (app *App) onDomReady(ctx context.Context) {
	go func() {
		// Wait 200ms for all the JS to load before making requests to it
		// TODO: Get rid of this hack
		// IF 200MS IS NOT ENOUGH THIS REQUIRES A REFACTOR, DON'T INCREASE
		time.Sleep(200 * time.Millisecond)
		app.initializeData()
	}()
}

func (app *App) initializeData() {
	vaultFile := readVaultFromFile()
	if vaultFile == nil {
		// Create new vault
		app.createNewVault()
	} else {
		// Existing vault
		if vaultFile.Favicons != nil {
			importFaviconCache(vaultFile.Favicons)
		}
		eject := logIn(vaultFile.VaultType, string(vaultFile.Data), vaultFile.Email)
		if !eject {
			// 1. Logged in locally or remotely
			app.client.loadData(vaultFile.VaultType, vaultFile.Data, vaultFile.LastUpdated, vaultFile.Email)
			if vaultFile.VaultType == accountVaultType {
				go app.updateRemoteVault()
			}
		} else {
			// 2. Eject and create new vault
			deleteVaultFile()
			app.createNewVault()
		}
	}
	go startFIDOServer(app.client.fidoClient)
}
