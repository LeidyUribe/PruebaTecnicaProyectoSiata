export class GetEnvioTerrestreUseCase {
  constructor(envioTerrestreRepository) {
    this.envioTerrestreRepository = envioTerrestreRepository;
  }

  async execute(id) {
    const envio = await this.envioTerrestreRepository.findById(id);
    if (!envio) {
      throw new Error('Envío terrestre no encontrado');
    }
    return envio;
  }
}
