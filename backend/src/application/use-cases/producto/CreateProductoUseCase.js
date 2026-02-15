/**
 * Caso de Uso: Crear Producto
 */
export class CreateProductoUseCase {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(productoData) {
    const Producto = (await import('../../../domain/entities/Producto.js')).Producto;
    const producto = new Producto(productoData);

    if (!producto.isValid()) {
      throw new Error('Datos del producto inválidos');
    }

    return await this.productoRepository.create(producto);
  }
}
