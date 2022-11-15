const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')

var dict = {
  items : []
}

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

  fs.readFile('items.json', 'utf8', function(err, data){
    data = JSON.parse(data)
    win.webContents.send('window:open', data.items)
  })

}

app.whenReady().then(() => {
  createWindow()
})

function saveItemsToJson(itemToSave){
  fs.writeFile('items.json', JSON.stringify(itemToSave), 'utf8', function(){})
}

ipcMain.on('window:close', (event, item) => {
  for (let i = 0; i < item.length; i++){
    dict.items.push(item[i])
  }
  saveItemsToJson(dict)
})