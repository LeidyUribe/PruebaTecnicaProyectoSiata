export class DeleteEnvioTerrestreUseCase {
  constructor(envioTerrestreRepository) {
    this.envioTerrestreRepository = envioTerrestreRepository;
  }

  async execute(id) {
    const envio = await this.envioTerrestreRepository.findById(id);
    if (!envio) {
      throw new Error('Envío terrestre no encontrado');
    }
    return await this.envioTerrestreRepository.delete(id);
  }
}
