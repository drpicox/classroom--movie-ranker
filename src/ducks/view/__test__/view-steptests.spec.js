import { createDucksStore } from "../../createDucksStore"
import { getRootView, replaceView } from ".."

let store
beforeEach(() => {
  store = createDucksStore()
})

test('create and register a "view" reducer that by default returns an object', () => {
  expect(store.getState()).toMatchObject({ view: {} })
})

test('make the reducer initialize to an object containing root:"Home"', () => {
  expect(store.getState()).toMatchObject({ view: { root: "Home" } })
})

test("create and export the function getRootView", () => {
  expect(getRootView).toBeInstanceOf(Function)
})

test("create and export the function replaceView", () => {
  expect(replaceView).toBeInstanceOf(Function)
})

test("make replaceView return an object", () => {
  expect(replaceView()).toMatchObject({})
})

test("make replaceView return an object with a field type which is a string", () => {
  expect(replaceView()).toMatchObject({ type: expect.any(String) })
})

test('make replaceView return an object with a field "view" which is an object', () => {
  expect(replaceView()).toMatchObject({ view: {} })
})

test('make replaceView put the first argument in the "view" object as root', () => {
  expect(replaceView("MyRoot")).toMatchObject({ view: { root: "MyRoot" } })
})
