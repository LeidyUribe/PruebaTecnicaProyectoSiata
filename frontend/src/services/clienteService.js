/**
 * Servicio de Cliente
 */
import api from './api';

export const clienteService = {
  async getAll() {
    const response = await api.get('/clientes');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },

  async create(cliente) {
    const response = await api.post('/clientes', cliente);
    return response.data;
  }
};
