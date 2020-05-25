import { makeRankMoviesByLikes } from "../"

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
