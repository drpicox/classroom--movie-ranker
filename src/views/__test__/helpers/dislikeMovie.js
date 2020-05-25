import { getByRole } from "@testing-library/dom"
import { getMovieRank } from "./getMovieRank"
import userEvent from "@testing-library/user-event"

export function dislikeMovie(app, position) {
  const rank = getMovieRank(app, position)

  const dislike = getByRole(rank, "button", { name: "dislike" })
  userEvent.click(dislike)
}
