import React from "react"
import { HomeView } from "./HomeView"
import { AddMovieView } from "./AddMovieView"

const views = {
  HomeView,
  AddMovieView,
}

export function RootView() {
  const root = "Home"

  const View = views[`${root}View`]
  return <View />
}
