/**
 * Caso de Uso: Crear Puerto
 */
export class CreatePuertoUseCase {
  constructor(puertoRepository) {
    this.puertoRepository = puertoRepository;
  }

  async execute(puertoData) {
    const Puerto = (await import('../../../domain/entities/Puerto.js')).Puerto;
    const puerto = new Puerto(puertoData);

    if (!puerto.isValid()) {
      throw new Error('Datos del puerto inválidos');
    }

    return await this.puertoRepository.create(puerto);
  }
}
