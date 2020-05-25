import { getByTestId } from "@testing-library/dom"

export function getSelectCurrentUser(app) {
  return getByTestId(app, "select-current-user")
}
