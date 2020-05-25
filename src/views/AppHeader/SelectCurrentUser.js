import React, { useCallback } from "react"
import { Form } from "react-bootstrap"

export function SelectCurrentUser() {
  const currentUserId = "u1"
  const users = [
    { userId: "u1", name: "Helen" },
    { userId: "u2", name: "Harry" },
  ]
  const onChange = useCallback(
    (event) => alert(`New UserId: "${event.target.value}"`),
    [],
  )

  return (
    currentUserId && (
      <Form.Control
        as="select"
        value={currentUserId}
        onChange={onChange}
        data-testid="select-current-user"
      >
        {users.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.name}
          </option>
        ))}
      </Form.Control>
    )
  )
}
