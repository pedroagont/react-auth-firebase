import NavigationBar from './NavigationBar';
import { useAuth } from '../contexts/authContext';

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <>
      <NavigationBar />
      {
        currentUser.displayName
        ? <h2 className="display-4 text-center pt-5">Welcome, { currentUser.displayName } 👋</h2>
        : <h2 className="display-4 text-center pt-5">Welcome, { currentUser.email } 👋</h2>
      }
    </>
  );
}

export default Dashboard;
