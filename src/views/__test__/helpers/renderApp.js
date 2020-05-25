import React from "react"
import { render } from "@testing-library/react"
import { createApp } from "../../../createApp"

export function renderApp() {
  global.alert = console.info
  const App = createApp()
  return { ...render(<App />), store: App.store }
}
