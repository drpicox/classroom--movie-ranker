import { getByText, getByTestId } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"

export function go(app, navigation) {
  const navbar = getByTestId(app, "navbar-sections")
  const option = getByText(navbar, navigation)
  userEvent.click(option)
}
