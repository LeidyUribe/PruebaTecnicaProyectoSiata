export class IClienteRepository {
  async create(cliente) {
    throw new Error('Method create() must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  async findAll() {
    throw new Error('Method findAll() must be implemented');
  }

  async update(id, cliente) {
    throw new Error('Method update() must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete() must be implemented');
  }

  async findByEmail(email) {
    throw new Error('Method findByEmail() must be implemented');
  }
}
