/**
 * Servicio de Producto
 */
import api from './api';

export const productoService = {
  async getAll() {
    const response = await api.get('/productos');
    return response.data;
  },

  async create(producto) {
    const response = await api.post('/productos', producto);
    return response.data;
  }
};
