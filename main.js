const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
  })

  win.loadFile('app/index.html')

}

app.whenReady().then(() => {
  createWindow()
})

function saveToJson(itemToSave){
  let json = JSON.stringify(itemToSave)
  fs.writeFile('items.json', json, 'utf8', function(){})
}

ipcMain.on('window:close', (event, item) => {
  saveToJson(item)
})