const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height : 600,
		autoHideMenuBar: true
	})
	win.loadFile("app/index.html")
}

app.whenReady().then(() => {
	createWindow()
})

function editItemPopup(item) {
	console.log("%e TODO: add edit item popup", 'background: #55f; color: #bada55')
}

ipcMain.on("item:update", (event, message) => editItemPopup(message))