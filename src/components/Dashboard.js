import { useAuth } from '../contexts/authContext';

function Dashboard() {
  const { currentUser } = useAuth();

  if(!currentUser) return <h1 className="display-1 text-center p-5">Hola desde el dashboard! 🕹</h1>

  return (
    <h1 className="display-1 text-center p-5">Bienvenido { currentUser.email } 🥳</h1>
  );
}

export default Dashboard;
