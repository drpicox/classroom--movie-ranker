import { createDucksStore } from "../../createDucksStore"
import { listLikes, toggleLike, toggleDislike, makeGetLike } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test("there are no likes in the beggining", () => {
  const likes = listLikes(store.getState())

  expect(likes).toEqual([])
})

test("toggleLike adds a like if there are no likes", () => {
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))

  const likes = listLikes(store.getState())
  expect(likes).toMatchObject([{ movieId: "m1", userId: "u1", value: 1 }])
})

test("toggleLike adds a like if there are no likes with the same movieId,userId", () => {
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u2" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u2" }))

  const likes = listLikes(store.getState())
  expect(likes).toHaveLength(4)
  expect(likes).toContainEqual({ movieId: "m1", userId: "u1", value: 1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u1", value: 1 })
  expect(likes).toContainEqual({ movieId: "m1", userId: "u2", value: 1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u2", value: 1 })
})

test("toggleLike removes a like if the movieId,userId already had a like", () => {
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u2" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u2" }))

  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))

  const likes = listLikes(store.getState())
  expect(likes).toHaveLength(3)
  expect(likes).toContainEqual({ movieId: "m2", userId: "u1", value: 1 })
  expect(likes).toContainEqual({ movieId: "m1", userId: "u2", value: 1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u2", value: 1 })
})

test("toggleDislike adds a like if there are no likes", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const likes = listLikes(store.getState())
  expect(likes).toMatchObject([{ movieId: "m1", userId: "u1", value: -1 }])
})

test("toggleDislike adds a like if there are no likes with the same movieId,userId", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u1" }))
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u2" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u2" }))

  const likes = listLikes(store.getState())
  expect(likes).toHaveLength(4)
  expect(likes).toContainEqual({ movieId: "m1", userId: "u1", value: -1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u1", value: -1 })
  expect(likes).toContainEqual({ movieId: "m1", userId: "u2", value: -1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u2", value: -1 })
})

test("toggleDislike removes a like if the movieId,userId already had a like", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u1" }))
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u2" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u2" }))

  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const likes = listLikes(store.getState())
  expect(likes).toHaveLength(3)
  expect(likes).toContainEqual({ movieId: "m2", userId: "u1", value: -1 })
  expect(likes).toContainEqual({ movieId: "m1", userId: "u2", value: -1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u2", value: -1 })
})

test("toggleLike and toggleDislike can work together", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u2" }))
  store.dispatch(toggleDislike({ movieId: "m2", userId: "u2" }))

  const likes = listLikes(store.getState())
  expect(likes).toHaveLength(2)
  expect(likes).toContainEqual({ movieId: "m1", userId: "u1", value: 1 })
  expect(likes).toContainEqual({ movieId: "m2", userId: "u2", value: -1 })
})

test("two consecutive calls to listLikes with the same state should return the instance", () => {
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))

  const likes1 = listLikes(store.getState())
  const likes2 = listLikes(store.getState())
  expect(likes1).toEqual(likes2)
})

test("makeGetLike returns the getLike selector that recovers the like of one movieId,userId", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m1", userId: "u2" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u1" }))
  store.dispatch(toggleLike({ movieId: "m2", userId: "u2" }))

  const getLike = makeGetLike()
  const movieLike = getLike(store.getState(), { movieId: "m1", userId: "u1" })

  expect(movieLike).toEqual({ movieId: "m1", userId: "u1", value: -1 })
})

test("getLike returns a like with value 0 if the movieId/userId does not exists", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const getLike = makeGetLike()
  const movieLikeX1 = getLike(store.getState(), { movieId: "mX", userId: "u1" })
  const movieLike1X = getLike(store.getState(), { movieId: "m1", userId: "uX" })
  const movieLikeXX = getLike(store.getState(), { movieId: "mX", userId: "uX" })

  expect(movieLikeX1).toEqual({ movieId: "mX", userId: "u1", value: 0 })
  expect(movieLike1X).toEqual({ movieId: "m1", userId: "uX", value: 0 })
  expect(movieLikeXX).toEqual({ movieId: "mX", userId: "uX", value: 0 })
})

test("getLike memorizes the call and do not recompute if arguments are the same", () => {
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const getLike = makeGetLike()
  const movieLikes1 = getLike(store.getState(), { movieId: "m1" })
  const movieLikes2 = getLike(store.getState(), { movieId: "m1" })

  expect(movieLikes1).toBe(movieLikes2)
  expect(getLike.recomputations()).toBe(1)
})

test("getLike refreshes the result when the like changes", () => {
  const getLike = makeGetLike()
  store.dispatch(toggleDislike({ movieId: "m1", userId: "u1" }))

  const before = getLike(store.getState(), { movieId: "m1", userId: "u1" })
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  const after = getLike(store.getState(), { movieId: "m1", userId: "u1" })

  expect(before).toEqual({ movieId: "m1", userId: "u1", value: -1 })
  expect(after).toEqual({ movieId: "m1", userId: "u1", value: 1 })
})

test("getLike refreshes the result when the like is added", () => {
  const getLike = makeGetLike()

  const before = getLike(store.getState(), { movieId: "m1", userId: "u1" })
  store.dispatch(toggleLike({ movieId: "m1", userId: "u1" }))
  const after = getLike(store.getState(), { movieId: "m1", userId: "u1" })

  expect(before).toEqual({ movieId: "m1", userId: "u1", value: 0 })
  expect(after).toEqual({ movieId: "m1", userId: "u1", value: 1 })
})
