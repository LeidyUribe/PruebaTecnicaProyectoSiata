import React, { useState } from 'react';

const PuertoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    pais: ''
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
        <label>Ubicación *</label>
        <input
          type="text"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>País</label>
        <input
          type="text"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary">
          Crear Puerto
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PuertoForm;
