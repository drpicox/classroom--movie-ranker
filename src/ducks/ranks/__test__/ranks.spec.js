import { createDucksStore } from "../../createDucksStore"
import { makeRankMoviesByLikes } from "../"
import { toggleLike, toggleDislike } from "../../likes"
import { replaceMovie } from "../../movies"

let store
beforeEach(() => {
  store = createDucksStore()
})

describe("first building helper tests", () => {
  test("create and export the function makeRankMoviesByLikes", () => {
    expect(makeRankMoviesByLikes).toBeInstanceOf(Function)
  })

  test("makeRankMoviesByLikes should return a function", () => {
    const rankMoviesByLikes = makeRankMoviesByLikes()
    expect(rankMoviesByLikes).toBeInstanceOf(Function)
  })

  test("makeRankMoviesByLikes should return a function created with reselect createSelector", () => {
    const rankMoviesByLikes = makeRankMoviesByLikes()
    expect(rankMoviesByLikes.recomputations).toBeInstanceOf(Function)
    expect(rankMoviesByLikes.recomputations()).toBeGreaterThanOrEqual(0)
  })
})

test("makeRankMoviesByLikes returns the rankMoviesByLikes selector that all movies scores", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([{ movieId: "m1", likes: 1, dislikes: 0 }])
})

test("rankMoviesByLikes scores likes:0 dislikes:0 if a movie has no likes", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([{ movieId: "m1", likes: 0, dislikes: 0 }])
})

test("rankMoviesByLikes accumulates dislikes if a movie has dislikes", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([{ movieId: "m1", likes: 0, dislikes: 1 }])
})

test("rankMoviesByLikes accumulates likes and dislikes", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u2" }))
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u3" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u4" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u5" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u5" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([{ movieId: "m1", likes: 3, dislikes: 1 }])
})

test("rankMoviesByLikes returns an empty list if there are no movies", () => {
  const rankMoviesByLikes = makeRankMoviesByLikes()
  const aggregation = rankMoviesByLikes(store.getState())

  expect(aggregation).toEqual([])
})

test("rankMoviesByLikes does not rank movies not present in movies", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([{ movieId: "m1", likes: 0, dislikes: 0 }])
})

test("rankMoviesByLikes sort movies per reverse score (likes - dislikes)", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(replaceMovie({ movieId: "m2" }))
  store.dispatch(replaceMovie({ movieId: "m3" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m3", userId: "u1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([
    { movieId: "m3", likes: 1, dislikes: 0 },
    { movieId: "m1", likes: 0, dislikes: 0 },
    { movieId: "m2", likes: 0, dislikes: 1 },
  ])
})

test("rankMoviesByLikes sort movies per id if scores (likes-dislikes) are equal", () => {
  store.dispatch(replaceMovie({ movieId: "m3" }))
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(replaceMovie({ movieId: "m2" }))
  store.dispatch(replaceMovie({ movieId: "m4" }))
  store.dispatch(replaceMovie({ movieId: "m5" }))
  store.dispatch(toggleLike({ movieId: "m4", userId: "u1" }))
  store.dispatch(toggleDislike({ movieId: "m5", userId: "u1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const ranking = rankMoviesByLikes(store.getState())

  expect(ranking).toEqual([
    { movieId: "m4", likes: 1, dislikes: 0 },
    { movieId: "m1", likes: 0, dislikes: 0 },
    { movieId: "m2", likes: 0, dislikes: 0 },
    { movieId: "m3", likes: 0, dislikes: 0 },
    { movieId: "m5", likes: 0, dislikes: 1 },
  ])
})

test("rankMoviesByLikes memorizes the call and do not recompute if state does not change", () => {
  store.dispatch(replaceMovie({ movieId: "m1" }))

  const rankMoviesByLikes = makeRankMoviesByLikes()
  const recomputationsBefore = rankMoviesByLikes.recomputations()
  const ranking1 = rankMoviesByLikes(store.getState())
  const ranking2 = rankMoviesByLikes(store.getState())
  const recomputationsAfter = rankMoviesByLikes.recomputations()

  expect(ranking1).toBe(ranking2)
  expect(recomputationsAfter).toBe(recomputationsBefore + 1)
})

test("rankMoviesByLikes refreshes the result when a like changes", () => {
  const rankMoviesByLikes = makeRankMoviesByLikes()
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(replaceMovie({ movieId: "m2" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u1" }))

  const before = rankMoviesByLikes(store.getState())
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  const after = rankMoviesByLikes(store.getState())

  expect(before).toEqual([
    { movieId: "m2", likes: 1, dislikes: 0 },
    { movieId: "m1", likes: 0, dislikes: 0 },
  ])
  expect(after).toEqual([
    { movieId: "m1", likes: 1, dislikes: 0 },
    { movieId: "m2", likes: 1, dislikes: 0 },
  ])
})

test("rankMoviesByLikes refreshes the result when movies changes", () => {
  const rankMoviesByLikes = makeRankMoviesByLikes()
  store.dispatch(replaceMovie({ movieId: "m1" }))
  store.dispatch(replaceMovie({ movieId: "m2" }))
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const before = rankMoviesByLikes(store.getState())
  store.dispatch(replaceMovie({ movieId: "m3" }))
  const after = rankMoviesByLikes(store.getState())

  expect(before).toEqual([
    { movieId: "m2", likes: 0, dislikes: 0 },
    { movieId: "m1", likes: 0, dislikes: 1 },
  ])
  expect(after).toEqual([
    { movieId: "m2", likes: 0, dislikes: 0 },
    { movieId: "m3", likes: 0, dislikes: 0 },
    { movieId: "m1", likes: 0, dislikes: 1 },
  ])
})

test("rankMoviesByLines has no arguments, so makeRankMoviesByLikes should return always the same function instance and do not create a selector each time, just once", () => {
  const selector1 = makeRankMoviesByLikes()
  const selector2 = makeRankMoviesByLikes()

  expect(selector1).toBe(selector2)
})
