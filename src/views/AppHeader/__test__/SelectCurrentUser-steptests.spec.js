import userEvent from "@testing-library/user-event"
import {
  renderApp,
  getSelectCurrentUser,
  changeUser,
} from "../../__test__/helpers"
import {
  replaceUser,
  replaceCurrentUserId,
  getCurrentUserId,
} from "../../../ducks"

let container
let store
beforeEach(() => {
  ;({ container, store } = renderApp())
})

test("It is in the document if there are user and one is selected", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceCurrentUserId("u1"))

  const selector = getSelectCurrentUser(container)
  expect(selector).toBeInTheDocument()
})

test("The select contains an option for the existing user", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceCurrentUserId("u1"))

  const selector = getSelectCurrentUser(container)
  expect(selector).toHaveTextContent("Mary")
})

test("The select contains an option for each existing user", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))
  store.dispatch(replaceCurrentUserId("u1"))

  const selector = getSelectCurrentUser(container)
  expect(selector).toHaveTextContent("Mary")
  expect(selector).toHaveTextContent("John")
})

test("The select value is the currentUserId", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))
  store.dispatch(replaceCurrentUserId("u1"))

  const selector = getSelectCurrentUser(container)
  expect(selector).toHaveValue("u1")
})

test("The display value is the corresponding for currentUserId", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))
  store.dispatch(replaceCurrentUserId("u1"))

  const selector = getSelectCurrentUser(container)
  expect(selector).toHaveDisplayValue("Mary")
  expect(selector).not.toHaveDisplayValue("John")
})

test("It changes the userCurrentId when an options is selected", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))
  store.dispatch(replaceCurrentUserId("u1"))

  const selector = getSelectCurrentUser(container)
  userEvent.selectOptions(selector, ["u2"])

  const currentUserId = getCurrentUserId(store.getState())
  expect(currentUserId).toBe("u2")
  expect(selector).toHaveDisplayValue("John")
  expect(selector).not.toHaveDisplayValue("Mary")
})

test("It changes the userCurrentId when an options is selected (version changeUser)", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))
  store.dispatch(replaceCurrentUserId("u1"))

  changeUser(container, "John")

  const selector = getSelectCurrentUser(container)
  const currentUserId = getCurrentUserId(store.getState())
  expect(currentUserId).toBe("u2")
  expect(selector).toHaveDisplayValue("John")
  expect(selector).not.toHaveDisplayValue("Mary")
})
