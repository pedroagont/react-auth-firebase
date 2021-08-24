import { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { Alert, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function Profile() {
  const { currentUser, logout } = useAuth();
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  async function handleLogout() {
    try {
      setError('');
      setLoading(true);
      await logout();
      history.push('/login');
    } catch (e) {
      setError('' + e);
      setLoading(false);
    }
  }

  return (
    !loading && <Card className="w-75 mx-auto mt-5">
      <Card.Body>
        <h1 className="display-4 text-center my-3">Profile</h1>
        { error && <Alert variant="danger">{error}</Alert> }
        <Card.Text className="text-center my-3">
            Email: { currentUser.email }
        </Card.Text>
        <Link to="/update-profile" className="btn btn-primary w-100">
          Update Profile
        </Link>
        <Card.Text className="text-muted text-center my-3">
            <Link to="/signup" onClick={ handleLogout }>Log Out</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Profile;
