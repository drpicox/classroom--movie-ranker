import React from "react"
import { Provider } from "react-redux"
import { createDucksStore } from "./ducks/createDucksStore"
import "./App.css"
import { AppMain, AppHeader, AppFooter } from "./views"

export function createApp(initialState, enhancer) {
  const store = createDucksStore(initialState, enhancer)

  function App() {
    return (
      <Provider store={store}>
        <AppHeader />
        <AppMain />
        <AppFooter />
      </Provider>
    )
  }

  App.store = store
  return App
}
