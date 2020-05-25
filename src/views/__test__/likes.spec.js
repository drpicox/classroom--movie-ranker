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

test("Initially movies have no likes and no dislikes", () => {
  addMovie(app, "Pi", 1998)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 0, dislikes: 0 })
})

test("Initially movies like and dislike icons are not active", () => {
  addMovie(app, "Pi", 1998)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: false })
})

test("Liking a movie increases like count and actives it", () => {
  addUser(app, "Marcy")
  addMovie(app, "Pi", 1998)

  likeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 1, dislikes: 0 })
  expect(movie).toMatchObject({ likeActive: true, dislikeActive: false })
})

test("Disliking a movie increases dislike count and actives it", () => {
  addUser(app, "Max")
  addMovie(app, "Pi", 1998)

  dislikeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 0, dislikes: 1 })
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: true })
})

test("Each user can contribute to increse likes and dislikes", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  likeMovie(app, 1)
  addUser(app, "Max")
  dislikeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 1, dislikes: 1 })
})

test("Active like/dislike button corresponds to the like of the current user", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  likeMovie(app, 1)
  addUser(app, "Max")
  dislikeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: true })
})

test("Users that not like/disliked view counts, but they have no active status", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  likeMovie(app, 1)
  addUser(app, "Max")
  dislikeMovie(app, 1)
  addUser(app, "Jenna")

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 1, dislikes: 1 })
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: false })
})

test("Liking again a liked movie it removes its like", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  likeMovie(app, 1)
  likeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 0, dislikes: 0 })
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: false })
})

test("Disliking again a disliked movie it removes its dislike", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  dislikeMovie(app, 1)
  dislikeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 0, dislikes: 0 })
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: false })
})

test("Disliking again a liked movie changes the like to dislike", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  likeMovie(app, 1)
  dislikeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 0, dislikes: 1 })
  expect(movie).toMatchObject({ likeActive: false, dislikeActive: true })
})

test("Disliking again a liked movie changes the like to dislike", () => {
  addMovie(app, "Pi", 1998)

  addUser(app, "Marcy")
  dislikeMovie(app, 1)
  likeMovie(app, 1)

  const movie = readMovieRank(app, 1)
  expect(movie).toMatchObject({ likes: 1, dislikes: 0 })
  expect(movie).toMatchObject({ likeActive: true, dislikeActive: false })
})
