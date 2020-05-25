import { getByRole, getByLabelText } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { go } from "./go"

export function addUser(app, name) {
  go(app, "Add User")

  const userInput = getByLabelText(app, "User name")
  userEvent.type(userInput, name)

  const addButton = getByRole(app, "button", { name: "Add" })
  userEvent.click(addButton)
}
