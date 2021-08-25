import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

import { AuthProvider } from '../contexts/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={ Dashboard } />
          <PrivateRoute path="/update-profile" component={ UpdateProfile } />
          <Route path="/signup" component={ Signup } />
          <Route path="/login" component={ Login } />
          <Route path="/forgot-password" component={ ForgotPassword } />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
