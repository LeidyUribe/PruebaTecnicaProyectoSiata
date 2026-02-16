export class SearchEnviosMaritimosUseCase {
  constructor(envioMaritimoRepository) {
    this.envioMaritimoRepository = envioMaritimoRepository;
  }

  async execute(filters = {}) {
    return await this.envioMaritimoRepository.findWithFilters(filters);
  }
}
