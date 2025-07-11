import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      const data = await res.json();
      alert('Registration failed: ' + (data.error || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="container-lg m-5 w-25 mx-auto">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username" className="form-label">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password" className="form-label">Password</label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary mb-3 btn-lg w-25">Register</button>
        <p>
          Already have an account? <Link to="/login" className="link-opacity-75 link-offset-1">Sign in here</Link>.
        </p>
      </div>
    </form>
  );
}
