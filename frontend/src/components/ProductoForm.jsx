import React, { useState } from 'react';

const ProductoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: ''
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
        <label>Tipo de Producto *</label>
        <input
          type="text"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary">
          Crear Producto
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;
