export class SearchEnviosTerrestresUseCase {
  constructor(envioTerrestreRepository) {
    this.envioTerrestreRepository = envioTerrestreRepository;
  }

  async execute(filters = {}) {
    return await this.envioTerrestreRepository.findWithFilters(filters);
  }
}
