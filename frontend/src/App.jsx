import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TodosPage from '../pages/TodosPage';
import HomePage from '../pages/HomePage';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthContext } from '../contexts/AuthContext';
import './App.css'

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <TodosPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

