import { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';

function UpdateProfile() {
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [ error, setError ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()

    if (newEmailRef.current.value === '' && newPasswordRef.current.value === '') {
      return setMessage('Nothing to change!');
    }

    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      return setError('Passwords no coinciden');
    }

    const promises = [];
    setError('');
    setLoading(true);

    if (newEmailRef.current.value !== '' && newEmailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(newEmailRef.current.value));
    }

    if (newPasswordRef.current.value !== '') {
      promises.push(updatePassword(newPasswordRef.current.value));
    }

    Promise.all(promises)
      .then(() => setMessage('Credentials changed!'))
      .catch(e => setError('' + e))
      .finally(() => setLoading(false));

  }

  return (
    <Card className="w-75 mx-auto mt-5">
      <Card.Body>
        <h1 className="display-4 text-center my-3">Update Profile</h1>
        { error && <Alert variant="danger">{error}</Alert> }
        { message && <Alert variant="success">{message}</Alert> }
        <Form onSubmit={ handleSubmit }>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Leave blank to keep current email" ref={newEmailRef} autoComplete="off" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Leave blank to keep current password" ref={ newPasswordRef } autoComplete="off" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={ confirmNewPasswordRef } autoComplete="off" />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit" disabled={ loading }>
            Update Profile
          </Button>
        </Form>
        <Card.Text className="text-muted text-center my-3">
            <Link to="/">Back to profile</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UpdateProfile;
