import React, { useState, useEffect } from 'react';
import { puertoService } from '../services/puertoService';
import PuertoForm from '../components/PuertoForm';

const Puertos = () => {
  const [puertos, setPuertos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadPuertos();
  }, []);

  const loadPuertos = async () => {
    try {
      const response = await puertoService.getAll();
      setPuertos(response.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar puertos' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (puertoData) => {
    try {
      await puertoService.create(puertoData);
      setMessage({ type: 'success', text: 'Puerto creado exitosamente' });
      setShowForm(false);
      loadPuertos();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear puerto'
      });
    }
  };

  if (loading) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Puertos</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nuevo Puerto
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {showForm && (
          <PuertoForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>
            {puertos.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No hay puertos registrados
                </td>
              </tr>
            ) : (
              puertos.map((puerto) => (
                <tr key={puerto.id}>
                  <td>{puerto.id}</td>
                  <td>{puerto.nombre}</td>
                  <td>{puerto.ubicacion}</td>
                  <td>{puerto.pais || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Puertos;
