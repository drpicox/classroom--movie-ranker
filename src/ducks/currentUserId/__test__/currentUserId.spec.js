import { createDucksStore } from "../../createDucksStore"
import { getCurrentUserId, replaceCurrentUserId } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test("getCurrentUserId returns null if no currentUserId is set", () => {
  const currentUserId = getCurrentUserId(store.getState())

  expect(currentUserId).toBe(null)
})

test("replaceCurrentUserId sets the current user id if not set", () => {
  store.dispatch(replaceCurrentUserId("u1"))

  const currentUserId = getCurrentUserId(store.getState())
  expect(currentUserId).toBe("u1")
})

test("replaceCurrentUserId changes the current user id", () => {
  store.dispatch(replaceCurrentUserId("u1"))
  store.dispatch(replaceCurrentUserId("u2"))

  const currentUserId = getCurrentUserId(store.getState())
  expect(currentUserId).toBe("u2")
})
