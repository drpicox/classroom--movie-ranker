import React from "react"
import { Navbar, Form } from "react-bootstrap"
import { NavbarSections } from "./NavbarSections"
import { SelectCurrentUser } from "./SelectCurrentUser"

export function AppNavbar() {
  return (
    <Navbar bg="primary">
      <Navbar.Brand>Movie Ranker</Navbar.Brand>
      <NavbarSections />
      <Form inline>
        <SelectCurrentUser />
      </Form>
    </Navbar>
  )
}
