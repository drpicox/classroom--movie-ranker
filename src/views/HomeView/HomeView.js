import React from "react"
import { TopMovie } from "./TopMovie"
import { TailMovies } from "./TailMovies"

export function HomeView() {
  return (
    <>
      <br />
      <h1 data-testid="view-title">Ranking</h1>
      <br />
      <TopMovie />
      <br />
      <TailMovies />
      <br />
    </>
  )
}
