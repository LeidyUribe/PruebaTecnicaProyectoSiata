import React, { useState } from 'react';
import { authService } from '../services/authService';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    rol: 'user' // Valor por defecto
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        // Registro - asegurar que rol tenga valor por defecto
        const registroData = {
          ...formData,
          rol: formData.rol || 'user' // Asegurar valor por defecto
        };
        await authService.register(registroData);
        // Después de registrar, hacer login automático
        const loginResponse = await authService.login(formData.email, formData.password);
        onLogin(loginResponse.token);
      } else {
        // Login
        const response = await authService.login(formData.email, formData.password);
        onLogin(response.token);
      }
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚚 Sistema de Logística</h1>
        <p className="login-subtitle">Gestión de Envíos Terrestres y Marítimos</p>
        
        <div className="login-tabs">
          <button
            type="button"
            className={!isRegister ? 'active' : ''}
            onClick={() => {
              setIsRegister(false);
              // Resetear formulario al cambiar a login
              setFormData({ email: '', password: '', nombre: '', rol: 'user' });
              setError('');
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={isRegister ? 'active' : ''}
            onClick={() => {
              setIsRegister(true);
              // Resetear formulario al cambiar a registro
              setFormData({ email: '', password: '', nombre: '', rol: 'user' });
              setError('');
            }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-error">{error}</div>}
          
          {isRegister && (
            <>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                <small style={{ color: '#666', fontSize: '0.875rem' }}>
                  Por defecto: Usuario
                </small>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder={isRegister ? "Mínimo 6 caracteres" : "Tu contraseña"}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading 
              ? (isRegister ? 'Registrando...' : 'Iniciando sesión...') 
              : (isRegister ? 'Registrarse' : 'Iniciar Sesión')
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
