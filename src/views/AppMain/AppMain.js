import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { RootView } from "../RootView"

export function AppMain() {
  return (
    <Container>
      <Row>
        <Col>
          <RootView />
        </Col>
      </Row>
    </Container>
  )
}
