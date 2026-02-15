import React, { useState, useEffect } from 'react';
import { bodegaService } from '../services/bodegaService';
import BodegaForm from '../components/BodegaForm';

const Bodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadBodegas();
  }, []);

  const loadBodegas = async () => {
    try {
      const response = await bodegaService.getAll();
      setBodegas(response.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar bodegas' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (bodegaData) => {
    try {
      await bodegaService.create(bodegaData);
      setMessage({ type: 'success', text: 'Bodega creada exitosamente' });
      setShowForm(false);
      loadBodegas();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear bodega'
      });
    }
  };

  if (loading) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Bodegas</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nueva Bodega
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {showForm && (
          <BodegaForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {bodegas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No hay bodegas registradas
                </td>
              </tr>
            ) : (
              bodegas.map((bodega) => (
                <tr key={bodega.id}>
                  <td>{bodega.id}</td>
                  <td>{bodega.nombre}</td>
                  <td>{bodega.direccion}</td>
                  <td>{bodega.ciudad || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bodegas;
