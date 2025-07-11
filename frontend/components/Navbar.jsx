import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar">
      <div className="container-fluid">
        <Link className="navbar-brand m-3" to="/">GetThingsDone</Link>

        <button className="navbar-toggler m-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-auto p-1">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {user ? (
              <li className="nav-item mx-auto p-1">
                <Link className="nav-link" to="/todos">My Tasks</Link>
              </li>
            ) : (
              <>
                <li className="nav-item mx-auto p-1">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item mx-auto p-1">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
