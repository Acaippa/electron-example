const { app, BrowserWindow, ipcMain } = require('electron')

var saved = false

const createWindow = () => {
	win = new BrowserWindow({
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
	win.on('close', (e) => {
		if (saved == false){
			e.preventDefault()
			win.webContents.send("json:save", {})
			saved = true
		}
	})
	ipcMain.on('app:close', () => {
		win.close()
	})
}
	

app.whenReady().then(() => {
	createWindow()
})

