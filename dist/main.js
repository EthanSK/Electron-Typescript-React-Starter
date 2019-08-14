"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var mainWindow;
var isDevEnv = false;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 300,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true
        },
        title: "Ethan's Slick Sample App"
    });
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    if (isDevEnv) {
        // and load the index.html of the app.
        mainWindow.loadURL("http://localhost:3000");
    }
    else {
        // and load  index.html of the app.
        mainWindow.loadFile(path_1.default.join(__dirname, "../view/build/index.html"));
    }
    mainWindow.webContents.once("did-finish-load", function () {
        mainWindow.webContents.send("test", "let's hope this message gets through to the renderer process");
    });
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
