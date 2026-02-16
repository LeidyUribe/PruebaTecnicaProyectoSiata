export class GetEnvioMaritimoUseCase {
  constructor(envioMaritimoRepository) {
    this.envioMaritimoRepository = envioMaritimoRepository;
  }

  async execute(id) {
    const envio = await this.envioMaritimoRepository.findById(id);
    if (!envio) {
      throw new Error('Envío marítimo no encontrado');
    }
    return envio;
  }
}
