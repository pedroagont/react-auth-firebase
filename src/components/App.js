import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';

import { AuthProvider } from '../contexts/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Dashboard } />
          <Route exact path="/signup" component={ Signup } />
          <Route exact path="/login" component={ Login } />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
