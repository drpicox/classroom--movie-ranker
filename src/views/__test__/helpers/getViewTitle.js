import { getByTestId } from "@testing-library/dom"

export function getViewTitle(app) {
  return getByTestId(app, "view-title")
}
