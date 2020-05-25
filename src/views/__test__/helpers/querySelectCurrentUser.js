import { queryByTestId } from "@testing-library/dom"

export function querySelectCurrentUser(app) {
  return queryByTestId(app, "select-current-user")
}
