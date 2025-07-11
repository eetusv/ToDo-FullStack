import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      navigate('/home');
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
    <div className="container-lg m-5 w-25 mx-auto">
      <div className="form-floating mb-3">
        <input type="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label for="username" className="form-label">Username</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label for="password" className="form-label">Password</label>
      </div>
      <br />
      <button type="submit" className="btn btn-primary mb-3 btn-lg w-25">Login</button>
      <p>
        Don't have an account? <Link to="/register" className="link-opacity-75 link-offset-1">Register here</Link>.
      </p>
    </div>
    </form>
  );
}
