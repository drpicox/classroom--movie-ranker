import { getByRole } from "@testing-library/dom"
import { getMovieRank } from "./getMovieRank"
import userEvent from "@testing-library/user-event"

export function likeMovie(app, position) {
  const rank = getMovieRank(app, position)

  const like = getByRole(rank, "button", { name: "like" })
  userEvent.click(like)
}
