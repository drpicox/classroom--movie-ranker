import { queryAllByTestId } from "@testing-library/dom"

export function queryAllMovieRanks(app) {
  return queryAllByTestId(app, "movie-rank")
}
