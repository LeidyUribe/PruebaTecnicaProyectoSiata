import React, { useState, useEffect } from 'react';

const EnvioTerrestreForm = ({ clientes, productos, bodegas, onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData ? {
    clienteId: String(initialData.clienteId),
    productoId: String(initialData.productoId),
    cantidad: String(initialData.cantidad),
    fechaRegistro: initialData.fechaRegistro?.split('T')[0] || '',
    fechaEntrega: initialData.fechaEntrega?.split('T')[0] || '',
    bodegaId: String(initialData.bodegaId),
    precioEnvio: String(initialData.precioEnvio),
    placaVehiculo: initialData.placaVehiculo || '',
    numeroGuia: initialData.numeroGuia || ''
  } : {
    clienteId: '',
    productoId: '',
    cantidad: '',
    fechaRegistro: '',
    fechaEntrega: '',
    bodegaId: '',
    precioEnvio: '',
    placaVehiculo: '',
    numeroGuia: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        clienteId: String(initialData.clienteId),
        productoId: String(initialData.productoId),
        cantidad: String(initialData.cantidad),
        fechaRegistro: initialData.fechaRegistro?.split('T')[0] || '',
        fechaEntrega: initialData.fechaEntrega?.split('T')[0] || '',
        bodegaId: String(initialData.bodegaId),
        precioEnvio: String(initialData.precioEnvio),
        placaVehiculo: initialData.placaVehiculo || '',
        numeroGuia: initialData.numeroGuia || ''
      });
    } else {
      setFormData({
        clienteId: '', productoId: '', cantidad: '', fechaRegistro: '', fechaEntrega: '',
        bodegaId: '', precioEnvio: '', placaVehiculo: '', numeroGuia: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      clienteId: parseInt(formData.clienteId),
      productoId: parseInt(formData.productoId),
      cantidad: parseInt(formData.cantidad),
      bodegaId: parseInt(formData.bodegaId),
      precioEnvio: parseFloat(formData.precioEnvio)
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Cliente *</label>
          <select
            name="clienteId"
            value={formData.clienteId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Producto *</label>
          <select
            name="productoId"
            value={formData.productoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad *</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Bodega *</label>
          <select
            name="bodegaId"
            value={formData.bodegaId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una bodega</option>
            {bodegas.map((bodega) => (
              <option key={bodega.id} value={bodega.id}>
                {bodega.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha Registro *</label>
          <input
            type="date"
            name="fechaRegistro"
            value={formData.fechaRegistro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha Entrega *</label>
          <input
            type="date"
            name="fechaEntrega"
            value={formData.fechaEntrega}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio Envío *</label>
          <input
            type="number"
            name="precioEnvio"
            value={formData.precioEnvio}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Placa Vehículo * (ABC123)</label>
          <input
            type="text"
            name="placaVehiculo"
            value={formData.placaVehiculo}
            onChange={handleChange}
            placeholder="ABC123"
            pattern="[A-Z]{3}[0-9]{3}"
            required
          />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label>Número Guía * (10 caracteres alfanuméricos)</label>
          <input
            type="text"
            name="numeroGuia"
            value={formData.numeroGuia}
            onChange={handleChange}
            maxLength="10"
            pattern="[A-Z0-9]{10}"
            required
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Actualizar Envío' : 'Crear Envío Terrestre'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EnvioTerrestreForm;
