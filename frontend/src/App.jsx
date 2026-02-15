import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos';
import Bodegas from './pages/Bodegas';
import Puertos from './pages/Puertos';
import EnviosTerrestres from './pages/EnviosTerrestres';
import EnviosMaritimos from './pages/EnviosMaritimos';
import Navbar from './components/Navbar';
import { authService } from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/clientes"
            element={
              isAuthenticated ? (
                <Clientes />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/productos"
            element={
              isAuthenticated ? (
                <Productos />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/bodegas"
            element={
              isAuthenticated ? (
                <Bodegas />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/puertos"
            element={
              isAuthenticated ? (
                <Puertos />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/envios-terrestres"
            element={
              isAuthenticated ? (
                <EnviosTerrestres />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/envios-maritimos"
            element={
              isAuthenticated ? (
                <EnviosMaritimos />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
