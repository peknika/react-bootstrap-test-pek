import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}
