import {
  renderApp,
  queryAllMovieRanks,
  addUser,
  getSelectCurrentUser,
  changeUser,
  getViewTitle,
  addMovie,
  getTopMovieRank,
  readMovieRank,
} from "./helpers"

let app
beforeEach(() => {
  app = renderApp().container
})

test("there are no movies in the beggining", () => {
  const movies = queryAllMovieRanks(app)

  expect(movies[0] || null).not.toBeInTheDocument()
})

test("after add a movie, it returns to Home", () => {
  addMovie(app, "Mary Poppins", 1964)

  const title = getViewTitle(app)
  expect(title).toHaveTextContent("Ranking")
})

test("first added movie gets to the top movie", () => {
  addMovie(app, "Mary Poppins", 1964)

  const topMovieRank = getTopMovieRank(app)
  expect(topMovieRank).toHaveTextContent("Mary Poppins")
  expect(topMovieRank).toHaveTextContent("1964")
})

test("following movies are into the tail movies", () => {
  addMovie(app, "Mary Poppins", 1964)
  addMovie(app, "Lt. Robin Crusoe", 1966)
  addMovie(app, "Gremlins", 1984)

  const tailMovie1 = readMovieRank(app, 2)
  const tailMovie2 = readMovieRank(app, 3)
  expect(tailMovie1).toMatchObject({ name: "Lt. Robin Crusoe", year: 1966 })
  expect(tailMovie2).toMatchObject({ name: "Gremlins", year: 1984 })
})
