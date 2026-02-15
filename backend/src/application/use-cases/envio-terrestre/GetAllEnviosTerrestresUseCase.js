/**
 * Caso de Uso: Obtener Todos los Envíos Terrestres
 */
export class GetAllEnviosTerrestresUseCase {
  constructor(envioTerrestreRepository) {
    this.envioTerrestreRepository = envioTerrestreRepository;
  }

  async execute() {
    return await this.envioTerrestreRepository.findAll();
  }
}
