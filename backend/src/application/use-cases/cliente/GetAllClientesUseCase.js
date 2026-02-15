/**
 * Caso de Uso: Obtener Todos los Clientes
 */
export class GetAllClientesUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute() {
    return await this.clienteRepository.findAll();
  }
}
