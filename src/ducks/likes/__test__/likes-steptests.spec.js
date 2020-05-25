import { createDucksStore } from "../../createDucksStore"
import { listLikes, toggleLike, toggleDislike, makeGetLike } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test('create and register a "likes" reducer that by default returns an empty list', () => {
  expect(store.getState()).toMatchObject({ likes: [] })
})

test("create and export the function listLikes", () => {
  expect(listLikes).toBeInstanceOf(Function)
})

test("create and export the function toggleLike", () => {
  expect(toggleLike).toBeInstanceOf(Function)
})

test("make toggleLike return an object", () => {
  expect(toggleLike()).toMatchObject({})
})

test("make toggleLike return an object with a field type which is a string", () => {
  expect(toggleLike()).toMatchObject({ type: expect.any(String) })
})

test('make toggleLike return an object with a field "like" which is the argument', () => {
  expect(toggleLike("XXX")).toMatchObject({ like: "XXX" })
})

test("create and export the function toggleDislike", () => {
  expect(toggleDislike).toBeInstanceOf(Function)
})

test("make toggleDislike return an object", () => {
  expect(toggleDislike()).toMatchObject({})
})

test("make toggleDislike return an object with a field type which is a string", () => {
  expect(toggleDislike()).toMatchObject({ type: expect.any(String) })
})

test('make toggleDislike return an object with a field "like" which is the argument', () => {
  expect(toggleDislike("XXX")).toMatchObject({ like: "XXX" })
})

test("create and export the function makeGetLike", () => {
  expect(makeGetLike).toBeInstanceOf(Function)
})

test("makeGetLike should return a function", () => {
  const getLike = makeGetLike()
  expect(getLike).toBeInstanceOf(Function)
})

test("makeGetLike should return a function created with reselect createSelector", () => {
  const getLike = makeGetLike()
  expect(getLike.recomputations).toBeInstanceOf(Function)
  expect(getLike.recomputations()).toBe(0)
})
