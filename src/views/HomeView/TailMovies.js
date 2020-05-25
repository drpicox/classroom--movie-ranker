import React from "react"
import { MovieRank } from "./MovieRank"

export function TailMovies() {
  const ranks = [{ movieId: "m1" }, { movieId: "m2" }, { movieId: "m3" }]

  return ranks.slice(1).map((rank) => <MovieRank key={rank.movieId} />)
}
