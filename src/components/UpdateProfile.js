import { useRef, useState } from 'react';
import { Alert, Image, Form, Button, Card, ProgressBar } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { firebaseStorage } from '../firebase'

function UpdateProfile() {
  const newNameRef = useRef();
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const newPhotoRef = useRef();
  const { currentUser, updateName, updateEmail, updatePassword, updatePhoto } = useAuth();
  const [ error, setError ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ photoSrc, setPhotoSrc ] = useState(currentUser.photoURL || '');
  const [ fileUploadingProgress, setFileUploadingProgress ] = useState();

  function handlePhoto(e) {
    const file = e.target.files[0]

    if (file === undefined) {
      e.target.value = '';
      return setError('File not selected!');
    }

    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      e.target.value = '';
      return setError('Only jpg or png files!');
    }

    if (file.size > 5000000) {
      e.target.value = '';
      return setError('File too big! Max size 5 MB');
    }

    setError('');
    setPhotoSrc(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault()

    setMessage('')
    setError('');
    setLoading(true);

    if (newNameRef.current.value === '' && newEmailRef.current.value === '' && newPasswordRef.current.value === '' && !newPhotoRef.current.files[0] ) {
      setMessage('Nothing to change!');
      setLoading(false);
      return;
    }

    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    const promises = [];

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
      .then(() => {
        if (!newPhotoRef.current.files[0]) return setMessage('Profile updated!');
        setLoading(true)
        setMessage('Uploading photo...');
        const uploadTask = firebaseStorage.ref(`users/${currentUser.uid}/photo`).put(newPhotoRef.current.files[0]);
        uploadTask.on('state_changed',
            snapshot => {
              setFileUploadingProgress(Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
            },
            error => setError(error),
            () => uploadTask.snapshot.ref.getDownloadURL()
                    .then(url => updatePhoto(url))
                    .then(() => setMessage('Profile updated!'))
        );
      })
      .then(() => setLoading(false))
      .catch(e => setError('' + e))
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
            {
              photoSrc && <div style={{ width: '200px', height: '200px', margin: '0 auto'}}>
                  <Image style={{ objectFit: 'cover', objectPosition: 'center'}} className="w-100 h-100 border border-2 border-secondary p-1" src={ photoSrc } roundedCircle />
                </div>
            }

            <Form.Group className="mb-3" controlId="formPhoto">
              <Form.Label>Profile photo</Form.Label>
              <Form.Control type="file" ref={ newPhotoRef } onChange={ handlePhoto } disabled={ loading } />
              {
                fileUploadingProgress && fileUploadingProgress !== 100
                ? <ProgressBar animated now={fileUploadingProgress} label={`${fileUploadingProgress}%`} />
                : ''
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={ currentUser.displayName ? currentUser.displayName : 'Enter your name' } ref={ newNameRef } autoComplete="off" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder={ currentUser.email } ref={ newEmailRef } autoComplete="off" />
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
