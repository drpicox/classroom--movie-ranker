# Movie Ranker assignment

## Identify yourself

Full Name: _______________________________
Id Number: _______________________________

## Requirements

- Node v12: https://nodejs.org/en/download/
  (Mac/Linux, best: https://github.com/nvm-sh/nvm )

- Yarn v1: https://classic.yarnpkg.com/lang/en/

- Prettier: https://prettier.io/
  Configure your IDE to support Prietter

- EditorConfig: https://editorconfig.org/
  Configure your IDE to support EditorConfig

- Eslint: https://eslint.org
  Configure your IDE to support EditorConfig

## Setup

1. Clone the repository

2. Execute `yarn` in the repository directory from console

## Run

- Run tests: `yarn test`

- Run application: `yarn start`

## Phase I

Solve all tests inside `src/ducks`.

Use: `yarn test -i ducks` to narrow tests only for ducks.

Start with _steptests_.
They are designed to assist you in the firsts steps.

Measure coverage with `CI=1 yarn test -i ducks --coverage`  
Remove `CI=1` if you do not execute from Unix (MAC/Linux)

## Phase II

Solve all tests inside `src/views`
and make sure that the application works correctly.
Make sure that tests inside `src/ducks` also pass.

Use: `yarn test -i views` to narrow tests only for ducks.
But remember execute `yarn test -i` to verify that
everything works.

Start with _steptests_.
They are designed to assist you in the firsts steps.

Measure coverage with `CI=1 yarn test -i --coverage`  
Remove `CI=1` if you do not execute from Unix (MAC/Linux)

## Final expected coverage

```
% CI=1 yarn test -i --coverage
yarn run v1.19.1
$ react-scripts test -i --coverage
PASS src/views/AddMovieView/__test__/AddMovieView-steptests.spec.js (8.91s)
PASS src/views/__test__/likes.spec.js
PASS src/views/__test__/ranks.spec.js
PASS src/ducks/view/__test__/view.spec.js
PASS src/ducks/currentUserId/__test__/currentUserId-steptests.spec.js
PASS src/views/AddUserView/__test__/AddUserView-steptests.spec.js
PASS src/views/__test__/movies.spec.js
PASS src/views/__test__/users.spec.js
PASS src/ducks/ranks/__test__/ranks-steptests.spec.js
PASS src/views/AppHeader/__test__/SelectCurrentUser-steptests.spec.js
PASS src/views/AppHeader/__test__/NavbarSections-steptests.spec.js
PASS src/views/__test__/RootView-steptests.spec.js
PASS src/views/__test__/app.spec.js
PASS src/ducks/likes/__test__/likes.spec.js
PASS src/ducks/view/__test__/view-steptests.spec.js
PASS src/ducks/users/__test__/users-steptests.spec.js
PASS src/ducks/ranks/__test__/ranks.spec.js
PASS src/ducks/likes/__test__/likes-steptests.spec.js
PASS src/ducks/movies/__test__/movies.spec.js
PASS src/ducks/users/__test__/users.spec.js
PASS src/ducks/movies/__test__/movies-steptests.spec.js
PASS src/ducks/currentUserId/__test__/currentUserId.spec.js
--------------------------------------|----------|----------|----------|----------|-------------------|
File                                  |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------------------------------|----------|----------|----------|----------|-------------------|
All files                             |    83.64 |    56.79 |    85.96 |    82.19 |                   |
 src                                  |      8.7 |        0 |    11.11 |      8.7 |                   |
  createApp.js                        |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |      100 |        0 |           9,14,24 |
  serviceWorker.js                    |        0 |        0 |        0 |        0 |... 32,133,135,138 |
 src/ducks                            |      100 |      100 |      100 |      100 |                   |
  createDucksStore.js                 |      100 |      100 |      100 |      100 |                   |
  freezeReducer.js                    |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/ducks/currentUserId              |      100 |      100 |      100 |      100 |                   |
  getCurrentUserId.js                 |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  reduceCurrentUserId.js              |      100 |      100 |      100 |      100 |                   |
  replaceCurrentUserId.js             |      100 |      100 |      100 |      100 |                   |
 src/ducks/likes                      |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  listLikes.js                        |      100 |      100 |      100 |      100 |                   |
  makeGetLike.js                      |      100 |      100 |      100 |      100 |                   |
  reduceLikes.js                      |      100 |      100 |      100 |      100 |                   |
  toggleDislike.js                    |      100 |      100 |      100 |      100 |                   |
  toggleLike.js                       |      100 |      100 |      100 |      100 |                   |
 src/ducks/movies                     |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  listMovies.js                       |      100 |      100 |      100 |      100 |                   |
  makeGetMovie.js                     |      100 |      100 |      100 |      100 |                   |
  reduceMovies.js                     |      100 |      100 |      100 |      100 |                   |
  replaceMovie.js                     |      100 |      100 |      100 |      100 |                   |
 src/ducks/ranks                      |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  makeRankMoviesByLikes.js            |      100 |      100 |      100 |      100 |                   |
 src/ducks/users                      |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  listUsers.js                        |      100 |      100 |      100 |      100 |                   |
  makeGetUser.js                      |      100 |      100 |      100 |      100 |                   |
  reduceUsers.js                      |      100 |      100 |      100 |      100 |                   |
  replaceUser.js                      |      100 |      100 |      100 |      100 |                   |
 src/ducks/view                       |      100 |      100 |      100 |      100 |                   |
  getRootView.js                      |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  reduceView.js                       |      100 |      100 |      100 |      100 |                   |
  replaceView.js                      |      100 |      100 |      100 |      100 |                   |
 src/views                            |      100 |      100 |      100 |      100 |                   |
  RootView.js                         |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/AddMovieView               |      100 |      100 |      100 |      100 |                   |
  AddMovieView.js                     |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/AddUserView                |      100 |      100 |      100 |      100 |                   |
  AddUserView.js                      |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/AppFooter                  |      100 |      100 |      100 |      100 |                   |
  AppFooter.js                        |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/AppHeader                  |      100 |      100 |      100 |      100 |                   |
  AppHeader.js                        |      100 |      100 |      100 |      100 |                   |
  AppNavbar.js                        |      100 |      100 |      100 |      100 |                   |
  NavbarSections.js                   |      100 |      100 |      100 |      100 |                   |
  SelectCurrentUser.js                |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/AppHeader/__test__/helpers |      100 |      100 |      100 |      100 |                   |
  getNavbarSections.js                |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/AppMain                    |      100 |      100 |      100 |      100 |                   |
  AppMain.js                          |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/HomeView                   |      100 |      100 |      100 |      100 |                   |
  HomeView.js                         |      100 |      100 |      100 |      100 |                   |
  MovieRank.js                        |      100 |      100 |      100 |      100 |                   |
  MovieRankLikes.js                   |      100 |      100 |      100 |      100 |                   |
  TailMovies.js                       |      100 |      100 |      100 |      100 |                   |
  TopMovie.js                         |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
 src/views/__test__/helpers           |    95.83 |       50 |      100 |    95.83 |                   |
  addMovie.js                         |      100 |      100 |      100 |      100 |                   |
  addUser.js                          |      100 |      100 |      100 |      100 |                   |
  changeUser.js                       |      100 |      100 |      100 |      100 |                   |
  dislikeMovie.js                     |      100 |      100 |      100 |      100 |                   |
  getMovieRank.js                     |    71.43 |       50 |      100 |    71.43 |              9,10 |
  getSelectCurrentUser.js             |      100 |      100 |      100 |      100 |                   |
  getTopMovieRank.js                  |      100 |      100 |      100 |      100 |                   |
  getViewTitle.js                     |      100 |      100 |      100 |      100 |                   |
  go.js                               |      100 |      100 |      100 |      100 |                   |
  index.js                            |        0 |        0 |        0 |        0 |                   |
  likeMovie.js                        |      100 |      100 |      100 |      100 |                   |
  queryAllMovieRanks.js               |      100 |      100 |      100 |      100 |                   |
  querySelectCurrentUser.js           |      100 |      100 |      100 |      100 |                   |
  readMovieRank.js                    |      100 |      100 |      100 |      100 |                   |
  renderApp.js                        |      100 |      100 |      100 |      100 |                   |
--------------------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 22 passed, 22 total
Tests:       149 passed, 149 total
Snapshots:   0 total
Time:        15.5s
```
