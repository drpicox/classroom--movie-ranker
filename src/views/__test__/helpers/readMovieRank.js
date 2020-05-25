import { getByTestId, getByRole } from "@testing-library/dom"
import { getMovieRank } from "./getMovieRank"

function isButtonActive(rank, name) {
  return getByRole(rank, "button", { name }).style.color === "red"
}

export function readMovieRank(app, position) {
  const rank = getMovieRank(app, position)

  const name = getByTestId(rank, "name").textContent
  const year = +getByTestId(rank, "year").textContent
  const likes = +getByTestId(rank, "likes").textContent
  const dislikes = +getByTestId(rank, "dislikes").textContent
  const likeActive = isButtonActive(rank, "like")
  const dislikeActive = isButtonActive(rank, "dislike")

  return { name, year, likes, dislikes, likeActive, dislikeActive }
}
