import { createDucksStore } from "../../createDucksStore"
import { listUsers, replaceUser, makeGetUser } from "../"

let store
beforeEach(() => {
  store = createDucksStore()
})

test("there are no users in the beggining", () => {
  const users = listUsers(store.getState())
  expect(users).toEqual([])
})

test("replaceUser adds a user if there are no users", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))

  const users = listUsers(store.getState())
  expect(users).toMatchObject([{ userId: "u1", name: "Mary" }])
})

test("replaceUser adds a user if there is no user with the same id", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))

  const users = listUsers(store.getState())
  expect(users).toHaveLength(2)
  expect(users).toContainEqual({ userId: "u1", name: "Mary" })
  expect(users).toContainEqual({ userId: "u2", name: "John" })
})

test("replaceUser replaces a user if it was present", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Old Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))
  store.dispatch(replaceUser({ userId: "u1", name: "New Mary" }))

  const users = listUsers(store.getState())
  expect(users).toHaveLength(2)
  expect(users).toContainEqual({ userId: "u1", name: "New Mary" })
  expect(users).toContainEqual({ userId: "u2", name: "John" })
})

test("two consecutive calls to listUsers with the same state should return the instance", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))

  const users1 = listUsers(store.getState())
  const users2 = listUsers(store.getState())
  expect(users1).toEqual(users2)
})

test("makeGetUser returns the getUser selector that recovers an user given an userId", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))
  store.dispatch(replaceUser({ userId: "u2", name: "John" }))

  const getUser = makeGetUser()
  const user = getUser(store.getState(), { userId: "u1" })

  expect(user).toEqual({ userId: "u1", name: "Mary" })
})

test("getUser returns undefined if no such user exists", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))

  const getUser = makeGetUser()
  const user = getUser(store.getState(), { userId: "uX" })

  expect(user).toEqual(undefined)
})

test("getUser memorizes the call and do not recompute if arguments are the same", () => {
  store.dispatch(replaceUser({ userId: "u1", name: "Mary" }))

  const getUser = makeGetUser()
  const user1 = getUser(store.getState(), { userId: "u1" })
  const user2 = getUser(store.getState(), { userId: "u1" })

  expect(user1).toBe(user2)
  expect(getUser.recomputations()).toBe(1)
})

test("check some random replaceUser", () => {
  store.dispatch(replaceUser({ userId: "u1", title: "User 1" }))
  store.dispatch(replaceUser({ userId: "u2", title: "User 2" }))
  store.dispatch(replaceUser({ userId: "u3", title: "User 3" }))
  store.dispatch(replaceUser({ userId: "u2", title: "Fixed 2" }))
  store.dispatch(replaceUser({ userId: "u3", title: "Fixed 3" }))

  const users = listUsers(store.getState())
  expect(users).toHaveLength(3)
  expect(users).toContainEqual({ userId: "u1", title: "User 1" })
  expect(users).toContainEqual({ userId: "u2", title: "Fixed 2" })
  expect(users).toContainEqual({ userId: "u3", title: "Fixed 3" })
})
