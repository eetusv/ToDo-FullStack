import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5 text-center">
      {user ? (
      <>
        <h1 className="mb-4">Welcome, {user.username}!</h1>
        <button className="btn btn-danger btn-lg w-25" onClick={logout}>Logout</button>
      </>
    ) : (
      <>
        <h1 className="mb-4">Welcome to GetThingsDone!</h1>
        <p>
          <Link to="/login" className="btn btn-primary mx-1 btn-lg w-25">Login</Link>
          <Link to="/register" className="btn btn-primary mx-1 btn-lg w-25">Register</Link>
        </p>
      </>
      )}
    </div>
  );
}
