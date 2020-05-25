import React, { useRef, useCallback } from "react"
import { Form, Button } from "react-bootstrap"
import { v4 as uuid } from "uuid"

function doNotPostForm(event) {
  event.preventDefault()
}

let currentId = 9999
function nextMovieId() {
  currentId += 1
  return `M-${currentId}-${uuid()}`
}

export function AddMovieView() {
  const movieRef = useRef()
  const yearRef = useRef()
  const handleSubmit = useCallback((event) => {
    doNotPostForm(event)

    const movieId = nextMovieId()
    const name = movieRef.current.value
    const year = +yearRef.current.value

    alert(JSON.stringify({ movieId, name, year }, null, 2))
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <br />
      <h1 data-testid="view-title">Add Movie</h1>
      <Form.Group controlId="movieName">
        <Form.Label>Movie name</Form.Label>
        <Form.Control
          ref={movieRef}
          type="name"
          placeholder="Enter the movie name"
          required
        />
      </Form.Group>

      <Form.Group controlId="movieYear">
        <Form.Label>Movie year</Form.Label>
        <Form.Control
          ref={yearRef}
          type="number"
          placeholder="Enter the movie release year"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add
      </Button>
      <br />
      <br />
      <br />
    </Form>
  )
}
