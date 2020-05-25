import React from "react"
import { Jumbotron } from "react-bootstrap"
import { MovieRank } from "./MovieRank"

export function TopMovie() {
  const rank = [{ movieId: "m1" }][0]

  if (!rank) return null

  return (
    <Jumbotron data-testid="top-movie">
      <h1>Top movie!</h1>
      <br />
      <MovieRank />
    </Jumbotron>
  )
}
