import { app, BrowserWindow } from "electron"
import path from "path"

let mainWindow: BrowserWindow | null
const isDevEnv = false

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 300,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true
    },
    title: "Ethan's Slick Sample App"
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  if (isDevEnv) {
    // and load the index.html of the app.
    mainWindow.loadURL("http://localhost:3000")
  } else {
    // and load  index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../view/build/index.html"))
  }

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow!.webContents.send(
      "test",
      "let's hope this message gets through to the renderer process"
    )
  })

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
