const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height : 600,
		webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
	})

	win.loadFile("app/index.html")
	win.openDevTools()
	win.removeMenu()
	app.on('close', (event) => {event.preventDefault(); win.webContents.send("json:save", {})})
}

app.whenReady().then(() => {
	createWindow()
})