import React, { useState, useEffect } from 'react';
import { envioTerrestreService } from '../services/envioTerrestreService';
import { clienteService } from '../services/clienteService';
import { productoService } from '../services/productoService';
import { bodegaService } from '../services/bodegaService';
import EnvioTerrestreForm from '../components/EnvioTerrestreForm';

const EnviosTerrestres = () => {
  const [envios, setEnvios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEnvio, setEditingEnvio] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [filters, setFilters] = useState({
    clienteId: '',
    numeroGuia: '',
    bodegaId: '',
    fechaRegistroDesde: '',
    fechaRegistroHasta: '',
    fechaEntregaDesde: '',
    fechaEntregaHasta: ''
  });

  useEffect(() => {
    loadEnvios();
    loadCatalogos();
  }, []);

  const loadCatalogos = async () => {
    try {
      const [clientesRes, productosRes, bodegasRes] = await Promise.all([
        clienteService.getAll(),
        productoService.getAll(),
        bodegaService.getAll()
      ]);
      setClientes(clientesRes.data || []);
      setProductos(productosRes.data || []);
      setBodegas(bodegasRes.data || []);
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar catálogos' });
    }
  };

  const loadEnvios = async (searchFilters = null) => {
    try {
      setLoading(true);
      const params = searchFilters || filters;
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== '' && v != null)
      );
      const res = await envioTerrestreService.getAll(cleanParams);
      setEnvios(res.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error al cargar envíos' });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadEnvios(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      clienteId: '',
      numeroGuia: '',
      bodegaId: '',
      fechaRegistroDesde: '',
      fechaRegistroHasta: '',
      fechaEntregaDesde: '',
      fechaEntregaHasta: ''
    });
  };

  const handleCreate = async (envioData) => {
    try {
      await envioTerrestreService.create(envioData);
      setMessage({ type: 'success', text: 'Envío terrestre creado exitosamente' });
      setShowForm(false);
      loadEnvios();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear envío'
      });
    }
  };

  const handleUpdate = async (envioData) => {
    if (!editingEnvio) return;
    try {
      await envioTerrestreService.update(editingEnvio.id, envioData);
      setMessage({ type: 'success', text: 'Envío terrestre actualizado exitosamente' });
      setShowForm(false);
      setEditingEnvio(null);
      loadEnvios();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al actualizar envío'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este envío?')) return;
    try {
      await envioTerrestreService.delete(id);
      setMessage({ type: 'success', text: 'Envío terrestre eliminado exitosamente' });
      loadEnvios();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al eliminar envío'
      });
    }
  };

  const openEdit = (envio) => {
    setEditingEnvio(envio);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEnvio(null);
  };

  if (loading && envios.length === 0) return <div className="container">Cargando...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Envíos Terrestres</h2>
          <button className="btn btn-primary" onClick={() => { setEditingEnvio(null); setShowForm(true); }}>
            + Nuevo Envío Terrestre
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSearch} style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '0.75rem' }}>Filtros de búsqueda</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem', alignItems: 'end' }}>
            <div className="form-group">
              <label>Cliente</label>
              <select
                value={filters.clienteId}
                onChange={(e) => setFilters({ ...filters, clienteId: e.target.value })}
              >
                <option value="">Todos</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Nº Guía</label>
              <input
                type="text"
                value={filters.numeroGuia}
                onChange={(e) => setFilters({ ...filters, numeroGuia: e.target.value })}
                placeholder="10 caracteres"
                maxLength="10"
              />
            </div>
            <div className="form-group">
              <label>Bodega</label>
              <select
                value={filters.bodegaId}
                onChange={(e) => setFilters({ ...filters, bodegaId: e.target.value })}
              >
                <option value="">Todas</option>
                {bodegas.map((b) => (
                  <option key={b.id} value={b.id}>{b.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>F.Reg. Desde</label>
              <input
                type="date"
                value={filters.fechaRegistroDesde}
                onChange={(e) => setFilters({ ...filters, fechaRegistroDesde: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>F.Reg. Hasta</label>
              <input
                type="date"
                value={filters.fechaRegistroHasta}
                onChange={(e) => setFilters({ ...filters, fechaRegistroHasta: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>F.Ent. Desde</label>
              <input
                type="date"
                value={filters.fechaEntregaDesde}
                onChange={(e) => setFilters({ ...filters, fechaEntregaDesde: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>F.Ent. Hasta</label>
              <input
                type="date"
                value={filters.fechaEntregaHasta}
                onChange={(e) => setFilters({ ...filters, fechaEntregaHasta: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
            <button type="button" className="btn btn-secondary" onClick={() => { handleClearFilters(); loadEnvios({}); }}>Limpiar</button>
          </div>
        </form>

        {showForm && (
          <EnvioTerrestreForm
            clientes={clientes}
            productos={productos}
            bodegas={bodegas}
            initialData={editingEnvio}
            onSubmit={editingEnvio ? handleUpdate : handleCreate}
            onCancel={closeForm}
          />
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente ID</th>
              <th>Producto ID</th>
              <th>Cantidad</th>
              <th>Placa Vehículo</th>
              <th>Número Guía</th>
              <th>Precio Final</th>
              <th>Descuento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {envios.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No hay envíos terrestres registrados
                </td>
              </tr>
            ) : (
              envios.map((envio) => (
                <tr key={envio.id}>
                  <td>{envio.id}</td>
                  <td>{envio.clienteId}</td>
                  <td>{envio.productoId}</td>
                  <td>{envio.cantidad}</td>
                  <td>{envio.placaVehiculo}</td>
                  <td>{envio.numeroGuia}</td>
                  <td>${envio.precioFinal?.toFixed(2)}</td>
                  <td>{(envio.descuento * 100).toFixed(0)}%</td>
                  <td>
                    <button className="btn btn-secondary" style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem' }} onClick={() => openEdit(envio)}>Editar</button>
                    <button className="btn" style={{ background: '#dc3545', color: 'white', padding: '0.25rem 0.5rem' }} onClick={() => handleDelete(envio.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnviosTerrestres;
