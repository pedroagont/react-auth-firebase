import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const { currentUser } = useAuth();

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand as={ Link } to="/">My app 📲</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              currentUser
              ? <Nav.Link as={ Link } to="/profile">Profile</Nav.Link>
              : <Nav.Link as={ Link } to="/login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
