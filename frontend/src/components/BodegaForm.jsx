import React, { useState } from 'react';

const BodegaForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: ''
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
        <label>Dirección *</label>
        <textarea
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          rows="3"
          required
        />
      </div>
      <div className="form-group">
        <label>Ciudad</label>
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary">
          Crear Bodega
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default BodegaForm;
