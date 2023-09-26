/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "dist/logo_mini_ico.ico",
        title: "Kartrider Tool -- LansDarkLauh",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('dist/index.html')
    mainWindow.setMenu(null)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle('read-local-map-library', async () => {
        const localPath = app.getPath('documents') + '/KartriderToolMapLib/'
        if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath, { recursive: true })
        }
        const result = await new Promise((resolve) => {
            fs.readdir(localPath, null, (err, files) => {
                if (files) {
                    const mapLibs = []
                    files.forEach(item => {
                        if (item.indexOf('txt') !== -1) {
                            mapLibs.push({
                                name: item.split('.')[0],
                                context: fs.readFileSync(app.getPath('documents') + '/KartriderToolMapLib/' + item, { encoding: 'utf-8' })
                            })
                        }
                    })
                    resolve(mapLibs)
                } else {
                    resolve([])
                }
            })
        })
        return result
    })
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.