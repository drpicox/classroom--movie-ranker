import { getByTestId } from "@testing-library/dom"

export function getNavbarSections(container) {
  return getByTestId(container, "navbar-sections")
}
