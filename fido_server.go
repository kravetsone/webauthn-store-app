package main

import (
	"time"

	virtual_fido "github.com/bulwarkid/virtual-fido"
)

func startFIDOServer(client *FIDOClient) {
	go attachUSBIPServer()
	virtual_fido.Start(client)
}

func attachUSBIPServer() {
	time.Sleep(250 * time.Millisecond)
	attachUSBIPWindows()

}

func attachUSBIPWindows() {
	runCommand([]string{"./usbip/usbip.exe", "install", "-u"})
	runCommand([]string{"./usbip/usbip.exe", "attach", "-r", "127.0.0.1", "-b", "2-2"})
}
