import { renderApp } from "../../__test__/helpers"
import userEvent from "@testing-library/user-event"
import { getNavbarSections } from "./helpers"
import { getRootView } from "../../../ducks"
import { getByText } from "@testing-library/dom"

let container
let store
beforeEach(() => {
  ;({ container, store } = renderApp())
})

test.each`
  navigation
  ${"Home"}
  ${"Add Movie"}
  ${"Add User"}
`("Shows the '$navigation' option", ({ navigation }) => {
  const navbar = getNavbarSections(container)

  expect(getByText(navbar, navigation)).toBeInTheDocument()
})

test.each`
  navigation     | destination
  ${"Home"}      | ${"Home"}
  ${"Add Movie"} | ${"AddMovie"}
  ${"Add User"}  | ${"AddUser"}
`(
  "Click on the '$navigation' option changes the root view to '$destination'",
  ({ navigation, destination }) => {
    const navbar = getNavbarSections(container)
    const option = getByText(navbar, navigation)
    userEvent.click(option)

    const root = getRootView(store.getState())
    expect(root).toBe(destination)
  },
)
