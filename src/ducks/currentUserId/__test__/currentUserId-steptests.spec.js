import { createDucksStore } from "../../createDucksStore"
import { getCurrentUserId, replaceCurrentUserId } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test('create and register a "currentUserId" reducer that by default returns null', () => {
  expect(store.getState()).toMatchObject({ currentUserId: null })
})

test("create and export the function getCurrentUserId", () => {
  expect(getCurrentUserId).toBeInstanceOf(Function)
})

test("create and export the function replaceCurrentUserId", () => {
  expect(replaceCurrentUserId).toBeInstanceOf(Function)
})

test("make replaceCurrentUserId return an object", () => {
  expect(replaceCurrentUserId()).toMatchObject({})
})

test("make replaceCurrentUserId return an object with a field type which is a string", () => {
  expect(replaceCurrentUserId()).toMatchObject({ type: expect.any(String) })
})

test('make replaceCurrentUserId return an object with a field "userId" which is the argument', () => {
  expect(replaceCurrentUserId("XXX")).toMatchObject({ userId: "XXX" })
})
