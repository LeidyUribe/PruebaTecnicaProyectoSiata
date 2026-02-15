/**
 * Caso de Uso: Obtener Todos los Envíos Marítimos
 */
export class GetAllEnviosMaritimosUseCase {
  constructor(envioMaritimoRepository) {
    this.envioMaritimoRepository = envioMaritimoRepository;
  }

  async execute() {
    return await this.envioMaritimoRepository.findAll();
  }
}
