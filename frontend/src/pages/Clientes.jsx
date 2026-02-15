import React, { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import ClienteForm from '../components/ClienteForm';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const response = await clienteService.getAll();
      setClientes(response.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar clientes' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (clienteData) => {
    try {
      await clienteService.create(clienteData);
      setMessage({ type: 'success', text: 'Cliente creado exitosamente' });
      setShowForm(false);
      loadClientes();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear cliente'
      });
    }
  };

  if (loading) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Clientes</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nuevo Cliente
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {showForm && (
          <ClienteForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No hay clientes registrados
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono || '-'}</td>
                  <td>{cliente.direccion || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
