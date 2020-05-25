import { createStore, combineReducers } from "redux"
import { freezeReducer } from "./freezeReducer"

const reducer = freezeReducer(
  combineReducers({
    removeme: () => [],
  }),
)

export function createDucksStore(initialState, enhancer) {
  return createStore(reducer, initialState, enhancer)
}
