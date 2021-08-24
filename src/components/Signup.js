import { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords no coinciden');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/login');
    } catch (e) {
      setError('' + e);
      setLoading(false);
    }
  }

  return (
    <Card className="w-75 mx-auto mt-5">
      <Card.Body>
        <h1 className="display-4 text-center my-3">Sign up</h1>
        { error && <Alert variant="danger">{error}</Alert> }
        <Form onSubmit={ handleSubmit }>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} autoComplete="off" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={ passwordRef } autoComplete="off" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={ confirmPasswordRef } autoComplete="off" required />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit" disabled={ loading }>
            Sign Up
          </Button>
        </Form>
        <Card.Text className="text-muted text-center my-3">
            Already have an account? <Link to="/login">Log In</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Signup;
