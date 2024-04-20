package main

import (
	"embed"
	"log"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app = NewApp()

	err := os.MkdirAll(configDir(), 0755)
	checkErr(err, "Could not create config directory")
	logFile, err := os.OpenFile(configFilePath("main.log"), os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	checkErr(err, "Could not create main log file")
	defer logFile.Close()
	consoleLogger := &Logger{log: log.New(logFile, "", 0)}
	consoleLogger.Debug("TEST!!")
	// Create application with options
	err = wails.Run(&options.App{
		Title:  "webauthn-store",
		Width:  400,
		Height: 600,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		OnDomReady:         app.onDomReady,
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.WARNING,
		Logger:             consoleLogger,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
