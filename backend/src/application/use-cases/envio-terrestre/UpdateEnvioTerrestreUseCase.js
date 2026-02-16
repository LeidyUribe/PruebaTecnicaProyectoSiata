export class UpdateEnvioTerrestreUseCase {
  constructor(
    envioTerrestreRepository,
    clienteRepository,
    productoRepository,
    bodegaRepository
  ) {
    this.envioTerrestreRepository = envioTerrestreRepository;
    this.clienteRepository = clienteRepository;
    this.productoRepository = productoRepository;
    this.bodegaRepository = bodegaRepository;
  }

  async execute(id, envioData) {
    const envioExistente = await this.envioTerrestreRepository.findById(id);
    if (!envioExistente) {
      throw new Error('Envío terrestre no encontrado');
    }

    const cliente = await this.clienteRepository.findById(envioData.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    const producto = await this.productoRepository.findById(envioData.productoId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const bodega = await this.bodegaRepository.findById(envioData.bodegaId);
    if (!bodega) {
      throw new Error('Bodega no encontrada');
    }

    const existingGuia = await this.envioTerrestreRepository.findByNumeroGuia(envioData.numeroGuia);
    if (existingGuia && existingGuia.id !== parseInt(id)) {
      throw new Error('El número de guía ya existe');
    }

    const EnvioTerrestre = (await import('../../../domain/entities/EnvioTerrestre.js')).EnvioTerrestre;
    const envio = new EnvioTerrestre({ ...envioData, id });

    if (!envio.isValid()) {
      throw new Error('Datos del envío inválidos');
    }

    envio.calcularPrecioFinal();

    return await this.envioTerrestreRepository.update(id, envio);
  }
}
