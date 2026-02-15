/**
 * Caso de Uso: Obtener Todas las Bodegas
 */
export class GetAllBodegasUseCase {
  constructor(bodegaRepository) {
    this.bodegaRepository = bodegaRepository;
  }

  async execute() {
    return await this.bodegaRepository.findAll();
  }
}
