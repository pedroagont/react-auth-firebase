import Signup from './Signup'
import { AuthProvider } from '../contexts/authContext';

function App() {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
}

export default App;
