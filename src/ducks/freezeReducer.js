const freezeds = new WeakSet()

function freezeState(state) {
  if (state && typeof state === "object" && !freezeds.has(state)) {
    freezeds.add(state)
    Object.keys(state).forEach((k) => {
      const val = state[k]
      if (typeof val === "object") {
        state[k] = freezeState(val)
      }
    })
  }
  Object.freeze(state)
  return state
}

export function freezeReducer(reduce) {
  return function (state, action) {
    const nextState = reduce(state, action)
    return freezeState(nextState)
  }
}
