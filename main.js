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
    webPreferences: { // Enable the use of 'require' in HTML
            nodeIntegration: true,
            contextIsolation: false,
        }
  })

  win.loadFile('app/index.html')

  fs.readFile('items.json', 'utf8', function(err, data){ // Read the JSON file and send the item list.
    data = JSON.parse(data)
    win.webContents.send('window:open', data.items)
  })

}

app.whenReady().then(() => {
  createWindow()
})

function saveItemsToJson(itemToSave){ // Write item into JSON file.
  fs.writeFile('items.json', JSON.stringify(itemToSave), 'utf8', function(){})
}

ipcMain.on('window:close', (event, item) => { // Update the local dict and save it to file.
  for (let i = 0; i < item.length; i++){
    dict.items.push(item[i])
  }
  saveItemsToJson(dict)
})