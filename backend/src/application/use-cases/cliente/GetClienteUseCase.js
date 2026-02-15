/**
 * Caso de Uso: Obtener Cliente
 */
export class GetClienteUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute(id) {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    return cliente;
  }
}
