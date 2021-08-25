import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [ error, setError ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions!');
      setLoading(false);
    } catch (e) {
      setError('' + e);
      setLoading(false);
    }
  }

  return (
    <Card className="w-75 mx-auto mt-5">
      <Card.Body>
        <h1 className="display-4 text-center my-3">Password Reset</h1>
        { error && <Alert variant="danger">{error}</Alert> }
        { message && <Alert variant="success">{message}</Alert> }
        <Form onSubmit={ handleSubmit }>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} autoComplete="off" required />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit" disabled={ loading }>
            Reset Password
          </Button>
        </Form>
        <Card.Text className="text-muted text-center my-3">
            <Link to="/login">Login</Link>
        </Card.Text>
        <Card.Text className="text-muted text-center my-3">
            Need an account? <Link to="/signup">Sign Up</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ForgotPassword;
