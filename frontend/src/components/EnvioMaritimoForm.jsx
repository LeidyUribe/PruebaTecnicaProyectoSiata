import React, { useState, useEffect } from 'react';

const EnvioMaritimoForm = ({ clientes, productos, puertos, onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData ? {
    clienteId: String(initialData.clienteId),
    productoId: String(initialData.productoId),
    cantidad: String(initialData.cantidad),
    fechaRegistro: initialData.fechaRegistro?.split('T')[0] || '',
    fechaEntrega: initialData.fechaEntrega?.split('T')[0] || '',
    puertoId: String(initialData.puertoId),
    precioEnvio: String(initialData.precioEnvio),
    numeroFlota: initialData.numeroFlota || '',
    numeroGuia: initialData.numeroGuia || ''
  } : {
    clienteId: '',
    productoId: '',
    cantidad: '',
    fechaRegistro: '',
    fechaEntrega: '',
    puertoId: '',
    precioEnvio: '',
    numeroFlota: '',
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
        puertoId: String(initialData.puertoId),
        precioEnvio: String(initialData.precioEnvio),
        numeroFlota: initialData.numeroFlota || '',
        numeroGuia: initialData.numeroGuia || ''
      });
    } else {
      setFormData({
        clienteId: '', productoId: '', cantidad: '', fechaRegistro: '', fechaEntrega: '',
        puertoId: '', precioEnvio: '', numeroFlota: '', numeroGuia: ''
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
      puertoId: parseInt(formData.puertoId),
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
          <label>Puerto *</label>
          <select
            name="puertoId"
            value={formData.puertoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un puerto</option>
            {puertos.map((puerto) => (
              <option key={puerto.id} value={puerto.id}>
                {puerto.nombre}
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
          <label>Número Flota * (ABC1234D)</label>
          <input
            type="text"
            name="numeroFlota"
            value={formData.numeroFlota}
            onChange={handleChange}
            placeholder="ABC1234D"
            pattern="[A-Z]{3}[0-9]{4}[A-Z]{1}"
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
          {initialData ? 'Actualizar Envío' : 'Crear Envío Marítimo'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EnvioMaritimoForm;
