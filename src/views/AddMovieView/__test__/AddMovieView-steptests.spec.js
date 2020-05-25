import { renderApp, go, addMovie } from "../../__test__/helpers"
import { getByLabelText, getByRole } from "@testing-library/dom"
import { listMovies } from "../../../ducks"

const { any } = expect

let app
let store
beforeEach(() => {
  ;({ container: app, store } = renderApp())
})

test("There is an input field for the name", () => {
  go(app, "Add Movie")

  expect(getByLabelText(app, "Movie name")).toBeInTheDocument()
})

test("There is an input field for the year", () => {
  go(app, "Add Movie")

  expect(getByLabelText(app, "Movie year")).toBeInTheDocument()
})

test("There is an add button", () => {
  go(app, "Add Movie")

  expect(getByRole(app, "button", { name: "Add" })).toBeInTheDocument()
})

test("Write a name and a year and click add button to add a new movie", () => {
  addMovie(app, "Movie", 1987)

  const movies = listMovies(store.getState())
  expect(movies).toEqual([{ name: "Movie", year: 1987, movieId: any(String) }])
})

test("Add many movies", () => {
  addMovie(app, "M1", 1)
  addMovie(app, "M2", 2)

  const users = listMovies(store.getState())
  expect(users).toHaveLength(2)
  expect(users).toContainEqual({ name: "M1", year: 1, movieId: any(String) })
  expect(users).toContainEqual({ name: "M2", year: 2, movieId: any(String) })
})
