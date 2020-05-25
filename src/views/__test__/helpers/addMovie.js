import { getByRole, getByLabelText } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { go } from "./go"

export function addMovie(app, name, year) {
  go(app, "Add Movie")

  const userInput = getByLabelText(app, "Movie name")
  userEvent.type(userInput, name)

  const yearInput = getByLabelText(app, "Movie year")
  userEvent.type(yearInput, `${year}`)

  const addButton = getByRole(app, "button", { name: "Add" })
  userEvent.click(addButton)
}
