import { renderApp, go, getViewTitle } from "./helpers"
import { replaceView } from "../../ducks"

let app
let store
beforeEach(() => {
  ;({ container: app, store } = renderApp())
})

test.each`
  root          | content
  ${"Home"}     | ${"Ranking"}
  ${"AddMovie"} | ${"Add Movie"}
  ${"AddUser"}  | ${"Add User"}
`(
  "The root view '$row' shows the content with title '$content'",
  ({ root, content }) => {
    store.dispatch(replaceView(root))

    const title = getViewTitle(app)
    expect(title).toHaveTextContent(content)
  },
)
