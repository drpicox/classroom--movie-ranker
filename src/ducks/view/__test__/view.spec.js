import { createDucksStore } from "../../createDucksStore"
import { getRootView, replaceView } from ".."

let store
beforeEach(() => {
  store = createDucksStore()
})

test('default root view is "Home"', () => {
  const rootView = getRootView(store.getState())

  expect(rootView).toBe("Home")
})

test("replaceView changes the root view", () => {
  store.dispatch(replaceView("Movies"))

  const rootView = getRootView(store.getState())
  expect(rootView).toBe("Movies")
})
