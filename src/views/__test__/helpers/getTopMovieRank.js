import { getByTestId } from "@testing-library/dom"

export function getTopMovieRank(app) {
  const topMovie = getByTestId(app, "top-movie")
  return getByTestId(topMovie, "movie-rank")
}
