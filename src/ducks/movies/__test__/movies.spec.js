import { createDucksStore } from "../../createDucksStore"
import { listMovies, replaceMovie, makeGetMovie } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test("there are no movies in the beginning", () => {
  const movies = listMovies(store.getState())
  expect(movies).toEqual([])
})

test("replaceMovie adds a movie if there are no movies", () => {
  store.dispatch(replaceMovie({ movieId: "m1", title: "A Movie", year: 2020 }))

  const movies = listMovies(store.getState())
  expect(movies).toMatchObject([
    { movieId: "m1", title: "A Movie", year: 2020 },
  ])
})

test("replaceMovie adds a movie if there are no movies with the same id", () => {
  store.dispatch(replaceMovie({ movieId: "m1", title: "A Movie", year: 2010 }))
  store.dispatch(
    replaceMovie({ movieId: "m2", title: "Other Movie", year: 2019 }),
  )

  const movies = listMovies(store.getState())
  expect(movies).toHaveLength(2)
  expect(movies).toContainEqual({ movieId: "m1", title: "A Movie", year: 2010 })
  expect(movies).toContainEqual({
    movieId: "m2",
    title: "Other Movie",
    year: 2019,
  })
})

test("replaceMovie replace and already added movie by the new with the same id", () => {
  store.dispatch(
    replaceMovie({ movieId: "m1", title: "Old Movie", year: 2010 }),
  )
  store.dispatch(replaceMovie({ movieId: "m2", title: "Other", year: 2019 }))

  store.dispatch(
    replaceMovie({ movieId: "m1", title: "New Movie", year: 2020 }),
  )

  const movies = listMovies(store.getState())
  expect(movies).toHaveLength(2)
  expect(movies).toContainEqual({
    movieId: "m1",
    title: "New Movie",
    year: 2020,
  })
  expect(movies).toContainEqual({ movieId: "m2", title: "Other", year: 2019 })
})

test("two consecutive calls to listMovies with the same state should return the instance", () => {
  store.dispatch(replaceMovie({ movieId: "m1", title: "A Movie", year: 2020 }))

  const movies1 = listMovies(store.getState())
  const movies2 = listMovies(store.getState())
  expect(movies1).toEqual(movies2)
})

test("makeGetMovie returns the getMovie selector that recovers an movie given an movieId", () => {
  store.dispatch(replaceMovie({ movieId: "m1", name: "A Movie", year: 2020 }))
  store.dispatch(replaceMovie({ movieId: "m2", name: "Other", year: 2010 }))

  const getMovie = makeGetMovie()
  const movie = getMovie(store.getState(), { movieId: "m1" })

  expect(movie).toEqual({ movieId: "m1", name: "A Movie", year: 2020 })
})

test("getMovie returns undefined if no such movie exists", () => {
  store.dispatch(replaceMovie({ movieId: "m1", name: "A Movie", year: 2020 }))

  const getMovie = makeGetMovie()
  const movie = getMovie(store.getState(), { movieId: "mX" })

  expect(movie).toEqual(undefined)
})

test("getMovie memorizes the call and do not recompute if arguments are the same", () => {
  store.dispatch(replaceMovie({ movieId: "m1", name: "A Movie", year: 2020 }))

  const getMovie = makeGetMovie()
  const movie1 = getMovie(store.getState(), { movieId: "m1" })
  const movie2 = getMovie(store.getState(), { movieId: "m1" })

  expect(movie1).toBe(movie2)
  expect(getMovie.recomputations()).toBe(1)
})

test("check some random replaceMovies", () => {
  store.dispatch(replaceMovie({ movieId: "m1", title: "Movie 1", year: 2010 }))
  store.dispatch(replaceMovie({ movieId: "m2", title: "Movie 2", year: 2019 }))
  store.dispatch(replaceMovie({ movieId: "m3", title: "Movie 3", year: 2020 }))
  store.dispatch(replaceMovie({ movieId: "m2", title: "Fixed 2", year: 2017 }))
  store.dispatch(replaceMovie({ movieId: "m3", title: "Fixed 3", year: 2018 }))

  const movies = listMovies(store.getState())
  expect(movies).toHaveLength(3)
  expect(movies).toContainEqual({ movieId: "m1", title: "Movie 1", year: 2010 })
  expect(movies).toContainEqual({ movieId: "m2", title: "Fixed 2", year: 2017 })
  expect(movies).toContainEqual({ movieId: "m3", title: "Fixed 3", year: 2018 })
})
