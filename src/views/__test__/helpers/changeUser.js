import { getByText } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { getSelectCurrentUser } from "./getSelectCurrentUser"

export function changeUser(container, name) {
  const selector = getSelectCurrentUser(container)
  const option = getByText(selector, name)

  userEvent.selectOptions(selector, [option.value])
}
