import { getAllByTestId, prettyDOM } from "@testing-library/dom"

export function getMovieRank(app, position) {
  const ranks = getAllByTestId(app, "movie-rank")

  const index = position - 1
  const movieRank = ranks[index]
  if (!movieRank) {
    prettyDOM(app)
    throw new ReferenceError(
      `Movie rank position:${position} not present, there are only ${ranks.length} movies`,
    )
  }

  return movieRank
}
