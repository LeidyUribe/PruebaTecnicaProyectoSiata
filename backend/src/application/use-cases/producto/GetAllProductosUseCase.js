/**
 * Caso de Uso: Obtener Todos los Productos
 */
export class GetAllProductosUseCase {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute() {
    return await this.productoRepository.findAll();
  }
}
