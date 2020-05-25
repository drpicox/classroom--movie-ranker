import React, { useRef, useCallback } from "react"
import { Form, Button } from "react-bootstrap"
import { v4 as uuid } from "uuid"

function doNotPostForm(event) {
  event.preventDefault()
}

let currentId = 9999
function nextUserId() {
  currentId += 1
  return `U-${currentId}-${uuid()}`
}

export function AddUserView() {
  const userRef = useRef()
  const handleSubmit = useCallback((event) => {
    doNotPostForm(event)

    const userId = nextUserId()
    const name = userRef.current.value

    alert(JSON.stringify({ userId, name }, null, 2))
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <br />
      <h1 data-testid="view-title">Add User</h1>
      <Form.Group controlId="movieName">
        <Form.Label>User name</Form.Label>
        <Form.Control
          ref={userRef}
          type="name"
          placeholder="Enter the user name"
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
