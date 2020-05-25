import { createDucksStore } from "../../createDucksStore"
import { listUsers, replaceUser, makeGetUser } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test('create and register a "users" reducer that by default returns an array', () => {
  expect(store.getState()).toMatchObject({ users: [] })
})

test("create and export the function listUsers", () => {
  expect(listUsers).toBeInstanceOf(Function)
})

test("create and export the function replaceUser", () => {
  expect(replaceUser).toBeInstanceOf(Function)
})

test("make replaceUser return an object", () => {
  expect(replaceUser()).toMatchObject({})
})

test("make replaceUser return an object with a field type which is a string", () => {
  expect(replaceUser()).toMatchObject({ type: expect.any(String) })
})

test('make replaceUser return an object with a field "movie" which is the argument', () => {
  expect(replaceUser("XXX")).toMatchObject({ user: "XXX" })
})

test("create and export the function makeGetUser", () => {
  expect(makeGetUser).toBeInstanceOf(Function)
})

test("makeGetUser should return a function", () => {
  const getUser = makeGetUser()
  expect(getUser).toBeInstanceOf(Function)
})

test("makeGetUser should return a function created with reselect createSelector", () => {
  const getUser = makeGetUser()
  expect(getUser.recomputations).toBeInstanceOf(Function)
  expect(getUser.recomputations()).toBe(0)
})
