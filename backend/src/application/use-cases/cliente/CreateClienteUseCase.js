/**
 * Caso de Uso: Crear Cliente
 * Implementa la lógica de negocio para crear un nuevo cliente
 */
export class CreateClienteUseCase {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async execute(clienteData) {
    // Validar que el email no exista
    const existingCliente = await this.clienteRepository.findByEmail(clienteData.email);
    if (existingCliente) {
      throw new Error('El email ya está registrado');
    }

    // Crear entidad de dominio
    const Cliente = (await import('../../../domain/entities/Cliente.js')).Cliente;
    const cliente = new Cliente(clienteData);

    // Validar entidad
    if (!cliente.isValid()) {
      throw new Error('Datos del cliente inválidos');
    }

    // Persistir
    return await this.clienteRepository.create(cliente);
  }
}
