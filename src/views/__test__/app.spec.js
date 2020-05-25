import { renderApp } from "./helpers"

test("the title of the app is Movie Ranker", () => {
  const { container } = renderApp()

  expect(container).toHaveTextContent("Movie Ranker")
})
