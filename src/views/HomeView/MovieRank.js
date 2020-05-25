import React from "react"
import { MovieRankLikes } from "./MovieRankLikes"

export function MovieRank() {
  return (
    <p data-testid="movie-rank">
      <small className="text-muted">
        Year: <span data-testid="year">1987</span>
      </small>{" "}
      <span className="h4 d-block" style={{ margin: 0 }} data-testid="name">
        Batteries not included
      </span>
      <MovieRankLikes />
    </p>
  )
}
