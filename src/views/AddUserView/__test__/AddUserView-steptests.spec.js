import { renderApp, go, addUser } from "../../__test__/helpers"
import { getByLabelText, getByRole } from "@testing-library/dom"
import { listUsers } from "../../../ducks"

let app
let store
beforeEach(() => {
  ;({ container: app, store } = renderApp())
})

test("There is an input field for the name", () => {
  go(app, "Add User")

  expect(getByLabelText(app, "User name")).toBeInTheDocument()
})

test("There is an add button", () => {
  go(app, "Add User")

  expect(getByRole(app, "button", { name: "Add" })).toBeInTheDocument()
})

test("Write a name into username and click add button to add a new user", () => {
  addUser(app, "Mary")

  const users = listUsers(store.getState())
  expect(users).toEqual([{ name: "Mary", userId: expect.any(String) }])
})

test("Add many users", () => {
  addUser(app, "Mary")
  addUser(app, "John")

  const users = listUsers(store.getState())
  expect(users).toHaveLength(2)
  expect(users).toContainEqual({ name: "Mary", userId: expect.any(String) })
  expect(users).toContainEqual({ name: "John", userId: expect.any(String) })
})
