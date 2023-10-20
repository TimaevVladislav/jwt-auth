import * as React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navigation from "./components/Navigation"
import Login from "./components/Login"
import {Context} from "./index"
import {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {IUsers} from "./interfaces/user.interface"

function App() {
  // @ts-ignore
    const {store} = React.useContext(Context)
    const [users, setUsers] = useState<IUsers[]>()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth()
        }
    }, [])

    const getUsers = async () => {
        const users = await store.fetchUsers()
        setUsers(users)
    }


    if (!store.isAuth) {
        return <Login />
    }

  return (
        <Router>
            <Navigation />
            <h1>{store.isAuth ? `User authorized ${store.user.email}` : "AUTHORIZE"}</h1>
            <button onClick={() => store.logout()}>Logout</button>

            <div>
                <button onClick={getUsers}>Users</button>
            </div>

            <div>
                {users?.map(user => <div key={user.email}>{user._id}</div>)}
            </div>
        </Router>
  )
}

export default observer(App)