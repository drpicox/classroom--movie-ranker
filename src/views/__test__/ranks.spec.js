import {
  renderApp,
  addUser,
  addMovie,
  readMovieRank,
  likeMovie,
  dislikeMovie,
} from "./helpers"

let app
beforeEach(() => {
  app = renderApp().container
})

test("First added movie is on the top", () => {
  addMovie(app, "Max Headroom", 1985)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ name: "Max Headroom", year: 1985 })
})

test("Following movies are ranked in the addition order", () => {
  addMovie(app, "Max Headroom", 1985)
  addMovie(app, "The Fifth Element", 1997)
  addMovie(app, "Taxi 2", 2000)

  const movie2 = readMovieRank(app, 2)
  const movie3 = readMovieRank(app, 3)
  expect(movie2).toMatchObject({ name: "The Fifth Element", year: 1997 })
  expect(movie3).toMatchObject({ name: "Taxi 2", year: 2000 })
})

test("movies are sorted by reverse score (likes - dislikes)", () => {
  addMovie(app, "Max Headroom", 1985)
  addMovie(app, "The Fifth Element", 1997)
  addMovie(app, "Taxi 2", 2000)

  addUser(app, "Daniel")
  dislikeMovie(app, 2)
  addUser(app, "Edison")
  likeMovie(app, 1)

  const movie1 = readMovieRank(app, 1)
  const movie2 = readMovieRank(app, 2)
  const movie3 = readMovieRank(app, 3)
  expect(movie1).toMatchObject({ name: "Max Headroom", year: 1985 })
  expect(movie2).toMatchObject({ name: "Taxi 2", year: 2000 })
  expect(movie3).toMatchObject({ name: "The Fifth Element", year: 1997 })
})
