import React, { useState } from 'react';

const ClienteForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <div className="form-group">
        <label>Nombre *</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <textarea
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary">
          Crear Cliente
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ClienteForm;
