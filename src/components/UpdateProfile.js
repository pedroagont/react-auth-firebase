import { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function UpdateProfile() {
  const newNameRef = useRef();
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const { currentUser, updateName, updateEmail, updatePassword } = useAuth();
  const [ error, setError ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()

    if (newNameRef.current.value === '' && newEmailRef.current.value === '' && newPasswordRef.current.value === '' ) {
      return setMessage('Nothing to change!');
    }

    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      return setError('Passwords do not match!');
    }

    const promises = [];
    setError('');
    setLoading(true);

    if (newNameRef.current.value !== '' && newNameRef.current.value !== currentUser.displayName) {
      promises.push(updateName(newNameRef.current.value));
    }

    if (newEmailRef.current.value !== '' && newEmailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(newEmailRef.current.value));
    }

    if (newPasswordRef.current.value !== '') {
      promises.push(updatePassword(newPasswordRef.current.value));
    }

    Promise.all(promises)
      .then(() => setMessage('Profile updated!'))
      .catch(e => setError('' + e))
      .finally(() => setLoading(false));

  }

  return (
    <>
      <NavigationBar />
      <Card className="w-75 mx-auto mt-5">
        <Card.Body>
          <h1 className="display-4 text-center my-3">Update Profile</h1>
          { error && <Alert variant="danger">{error}</Alert> }
          { message && <Alert variant="success">{message}</Alert> }
          <Form onSubmit={ handleSubmit }>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Leave blank to keep the same" ref={ newNameRef } autoComplete="off" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Leave blank to keep the same" ref={ newEmailRef } autoComplete="off" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Leave blank to keep the same" ref={ newPasswordRef } autoComplete="off" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={ confirmNewPasswordRef } autoComplete="off" />
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit" disabled={ loading }>
              Save
            </Button>
          </Form>
          <Card.Text className="text-muted text-center my-3">
            <Link to="/profile">Back to profile</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default UpdateProfile;
