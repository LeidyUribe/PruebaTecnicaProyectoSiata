/**
 * Interfaz del Repositorio de Bodega
 */
export class IBodegaRepository {
  async create(bodega) {
    throw new Error('Method create() must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  async findAll() {
    throw new Error('Method findAll() must be implemented');
  }

  async update(id, bodega) {
    throw new Error('Method update() must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete() must be implemented');
  }
}
