import * as React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navigation from "./components/Navigation"
import Login from "./components/Login"

export default function App() {
  return (
        <Router>
            <Navigation />

            <Login />
        </Router>
  )
}