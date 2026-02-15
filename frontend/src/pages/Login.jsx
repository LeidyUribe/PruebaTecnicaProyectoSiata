import React, { useState } from 'react';
import { authService } from '../services/authService';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login();
      onLogin(response.token);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚚 Sistema de Logística</h1>
        <p className="login-subtitle">Gestión de Envíos Terrestres y Marítimos</p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-error">{error}</div>}
          
          <p className="login-info">
            Para esta prueba técnica, haz clic en el botón para obtener un token de autenticación.
          </p>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
