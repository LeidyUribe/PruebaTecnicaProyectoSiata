/**
 * Interfaz del Repositorio de Envío Marítimo
 */
export class IEnvioMaritimoRepository {
  async create(envio) {
    throw new Error('Method create() must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  async findAll() {
    throw new Error('Method findAll() must be implemented');
  }

  async findByClienteId(clienteId) {
    throw new Error('Method findByClienteId() must be implemented');
  }

  async findByNumeroGuia(numeroGuia) {
    throw new Error('Method findByNumeroGuia() must be implemented');
  }

  async update(id, envio) {
    throw new Error('Method update() must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete() must be implemented');
  }
}
