// @ts-ignore
import React from "react"
// @ts-ignore
import ReactDOM from "react-dom/client"
import "./css/index.css"

import App from "./App"
import Store from "./store/index"

interface State {
    store: Store
}

const store = new Store()

export const Context = React.createContext<State>({
    store
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
       <Context.Provider value={store}>
            <App />
       </Context.Provider>
  </React.StrictMode>
)
