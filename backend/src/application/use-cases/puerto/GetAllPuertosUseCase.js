/**
 * Caso de Uso: Obtener Todos los Puertos
 */
export class GetAllPuertosUseCase {
  constructor(puertoRepository) {
    this.puertoRepository = puertoRepository;
  }

  async execute() {
    return await this.puertoRepository.findAll();
  }
}
