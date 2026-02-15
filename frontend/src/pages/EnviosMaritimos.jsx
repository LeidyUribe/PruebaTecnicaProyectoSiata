import React, { useState, useEffect } from 'react';
import { envioMaritimoService } from '../services/envioMaritimoService';
import { clienteService } from '../services/clienteService';
import { productoService } from '../services/productoService';
import { puertoService } from '../services/puertoService';
import EnvioMaritimoForm from '../components/EnvioMaritimoForm';

const EnviosMaritimos = () => {
  const [envios, setEnvios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [puertos, setPuertos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [enviosRes, clientesRes, productosRes, puertosRes] = await Promise.all([
        envioMaritimoService.getAll(),
        clienteService.getAll(),
        productoService.getAll(),
        puertoService.getAll()
      ]);

      setEnvios(enviosRes.data || []);
      setClientes(clientesRes.data || []);
      setProductos(productosRes.data || []);
      setPuertos(puertosRes.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar datos' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (envioData) => {
    try {
      await envioMaritimoService.create(envioData);
      setMessage({ type: 'success', text: 'Envío marítimo creado exitosamente' });
      setShowForm(false);
      loadData();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear envío'
      });
    }
  };

  if (loading) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Envíos Marítimos</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Nuevo Envío Marítimo
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {showForm && (
          <EnvioMaritimoForm
            clientes={clientes}
            productos={productos}
            puertos={puertos}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente ID</th>
              <th>Producto ID</th>
              <th>Cantidad</th>
              <th>Número Flota</th>
              <th>Número Guía</th>
              <th>Precio Final</th>
              <th>Descuento</th>
            </tr>
          </thead>
          <tbody>
            {envios.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No hay envíos marítimos registrados
                </td>
              </tr>
            ) : (
              envios.map((envio) => (
                <tr key={envio.id}>
                  <td>{envio.id}</td>
                  <td>{envio.clienteId}</td>
                  <td>{envio.productoId}</td>
                  <td>{envio.cantidad}</td>
                  <td>{envio.numeroFlota}</td>
                  <td>{envio.numeroGuia}</td>
                  <td>${envio.precioFinal?.toFixed(2)}</td>
                  <td>{(envio.descuento * 100).toFixed(0)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnviosMaritimos;
