/**
 * Caso de Uso: Crear Bodega
 */
export class CreateBodegaUseCase {
  constructor(bodegaRepository) {
    this.bodegaRepository = bodegaRepository;
  }

  async execute(bodegaData) {
    const Bodega = (await import('../../../domain/entities/Bodega.js')).Bodega;
    const bodega = new Bodega(bodegaData);

    if (!bodega.isValid()) {
      throw new Error('Datos de la bodega inválidos');
    }

    return await this.bodegaRepository.create(bodega);
  }
}
