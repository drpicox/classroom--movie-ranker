import { createDucksStore } from "../../createDucksStore"
import { listMovies, replaceMovie, makeGetMovie } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test('create and register a "movies" reducer that by default returns an array', () => {
  expect(store.getState()).toMatchObject({ movies: [] })
})

test("create and export the function listMovies", () => {
  expect(listMovies).toBeInstanceOf(Function)
})

test("create and export the function replaceMovie", () => {
  expect(replaceMovie).toBeInstanceOf(Function)
})

test("make replaceMovie return an object", () => {
  expect(replaceMovie()).toMatchObject({})
})

test("make replaceMovie return an object with a field type which is a string", () => {
  expect(replaceMovie()).toMatchObject({ type: expect.any(String) })
})

test('make replaceMovie return an object with a field "movie" which is the argument', () => {
  expect(replaceMovie("XXX")).toMatchObject({ movie: "XXX" })
})

test("create and export the function makeGetMovie", () => {
  expect(makeGetMovie).toBeInstanceOf(Function)
})

test("makeGetMovie should return a function", () => {
  const getMovie = makeGetMovie()
  expect(getMovie).toBeInstanceOf(Function)
})

test("makeGetMovie should return a function created with reselect createSelector", () => {
  const getMovie = makeGetMovie()
  expect(getMovie.recomputations).toBeInstanceOf(Function)
  expect(getMovie.recomputations()).toBe(0)
})
