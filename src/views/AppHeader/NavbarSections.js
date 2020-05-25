import React, { useCallback } from "react"
import { Nav } from "react-bootstrap"

const sections = [
  { root: "Home", text: "Home" },
  { root: "AddMovie", text: "Add Movie" },
]

export function NavbarSections() {
  const go = useCallback((root) => alert(`go ${root}`), [])

  return (
    <Nav className="mr-auto" data-testid="navbar-sections">
      {sections.map((section) => (
        <Nav.Item key={section.root}>
          <Nav.Link data-testid="nav-home" onClick={() => go(section.root)}>
            {section.text}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}
