const { app } = require("electron")
const electron = require("electron")
const path = require("path")

const createWindow = () => {
    const window = new electron.BrowserWindow({
        frame: false,
        width: 1600,
        height: 900,
        minHeight: 40,
        minWidth: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'build/icon.png')
    })
    const ipc = electron.ipcMain
    ipc.on("maximize", () => {
        if (window.isMaximized()) {
            window.unmaximize()
        } else {
            window.maximize()
        }
    })
    ipc.on("minimize", () => {
        window.minimize()
    })
    ipc.on("close", () => {
        app.quit()
    })

    window.webContents.setWindowOpenHandler(details => {
        require('electron').shell.openExternal(details.url)
        return { action: 'deny' }
    })

    window.loadFile("src/index.html")
}

app.whenReady().then(() => {
    createWindow()
})

app.on("window-all-closed", () => {
    app.quit()
})