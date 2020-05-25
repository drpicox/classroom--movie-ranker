import {
  renderApp,
  querySelectCurrentUser,
  addUser,
  getSelectCurrentUser,
  changeUser,
  getViewTitle,
} from "./helpers"

let app
beforeEach(() => {
  app = renderApp().container
})

test("there are no users in the beggining", () => {
  const switcher = querySelectCurrentUser(app)

  expect(switcher).not.toBeInTheDocument()
})

test("adding an user selects it as a current", () => {
  addUser(app, "Mary")

  const select = getSelectCurrentUser(app)
  expect(select).toHaveDisplayValue("Mary")
})

test("add user always left selected the last added user", () => {
  addUser(app, "Mary")
  addUser(app, "John")

  const select = getSelectCurrentUser(app)
  expect(select).toHaveDisplayValue("John")
})

test("add user returns Home after a user is added", () => {
  addUser(app, "Mary")

  const title = getViewTitle(app)
  expect(title).toHaveTextContent("Ranking")
})

test("use the selector to change the current user", () => {
  addUser(app, "Mary")
  addUser(app, "John")

  changeUser(app, "Mary")

  const select = getSelectCurrentUser(app)
  expect(select).toHaveDisplayValue("Mary")
})
