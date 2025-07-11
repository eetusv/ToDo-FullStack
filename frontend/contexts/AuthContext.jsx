import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/profile', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setUser(data?.user || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);