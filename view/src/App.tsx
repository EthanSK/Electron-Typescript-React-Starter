import React, { useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"
import { IpcRenderer } from "electron"

declare global {
  interface Window {
    require: (
      module: "electron"
    ) => {
      ipcRenderer: IpcRenderer
    }
  }
}

const { ipcRenderer } = window.require("electron")

//uses hooks, can easily be converted to component with mount and unmount
const App: React.FC = () => {
  useEffect(() => {
    ipcRenderer.on("test", (event, data) => {
      console.log("ipc registered test event", data)
    })
    return () => {
      ipcRenderer.removeListener("test", () => {
        console.log("ipc removed test event listener")
      })
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
