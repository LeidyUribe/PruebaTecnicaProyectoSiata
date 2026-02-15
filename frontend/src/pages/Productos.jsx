import React, { useState, useEffect } from 'react';
import { productoService } from '../services/productoService';
import ProductoForm from '../components/ProductoForm';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await productoService.getAll();
      setProductos(response.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar productos' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (productoData) => {
    try {
      await productoService.create(productoData);
      setMessage({ type: 'success', text: 'Producto creado exitosamente' });
      setShowForm(false);
      loadProductos();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear producto'
      });
    }
  };

  if (loading) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Productos</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nuevo Producto
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {showForm && (
          <ProductoForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.tipo}</td>
                  <td>{producto.descripcion || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;
