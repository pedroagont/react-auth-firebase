import { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { Link, Redirect } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login } = useAuth();
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setError('' + e);
      setLoading(false);
    }
  }

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <NavigationBar />
      <Card className="w-75 mx-auto mt-5">
        <Card.Body>
          <h1 className="display-4 text-center my-3">Sign in</h1>
          { error && <Alert variant="danger">{error}</Alert> }
          <Form onSubmit={ handleSubmit }>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={ emailRef } autoComplete="off" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={ passwordRef } autoComplete="off" required />
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit" disabled={ loading }>
              Sign in
            </Button>
          </Form>
          <Card.Text className="text-muted text-center my-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </Card.Text>
          <Card.Text className="text-muted text-center my-3">
            Need an account? <Link to="/signup">Sign up</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Login;
