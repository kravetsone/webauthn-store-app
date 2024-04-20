package main

import (
	"time"

	virtual_fido "github.com/bulwarkid/virtual-fido"
)

func startFIDOServer(client *FIDOClient) {
	println("START")
	go attachUSBIPServer()
	virtual_fido.Start(client)
}

func attachUSBIPServer() {
	println("WAIT")
	time.Sleep(250 * time.Millisecond)
	attachUSBIPWindows()

}

func attachUSBIPWindows() {
	println("LOOGED")
	runCommand([]string{"ls"})
	runCommand([]string{"./usbip/usbip.exe", "install", "-u"})
	runCommand([]string{"./usbip/usbip.exe", "attach", "-r", "127.0.0.1", "-b", "2-2"})
}
