export class UpdateEnvioMaritimoUseCase {
  constructor(
    envioMaritimoRepository,
    clienteRepository,
    productoRepository,
    puertoRepository
  ) {
    this.envioMaritimoRepository = envioMaritimoRepository;
    this.clienteRepository = clienteRepository;
    this.productoRepository = productoRepository;
    this.puertoRepository = puertoRepository;
  }

  async execute(id, envioData) {
    const envioExistente = await this.envioMaritimoRepository.findById(id);
    if (!envioExistente) {
      throw new Error('Envío marítimo no encontrado');
    }

    const cliente = await this.clienteRepository.findById(envioData.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    const producto = await this.productoRepository.findById(envioData.productoId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const puerto = await this.puertoRepository.findById(envioData.puertoId);
    if (!puerto) {
      throw new Error('Puerto no encontrado');
    }

    const existingGuia = await this.envioMaritimoRepository.findByNumeroGuia(envioData.numeroGuia);
    if (existingGuia && existingGuia.id !== parseInt(id)) {
      throw new Error('El número de guía ya existe');
    }

    const EnvioMaritimo = (await import('../../../domain/entities/EnvioMaritimo.js')).EnvioMaritimo;
    const envio = new EnvioMaritimo({ ...envioData, id });

    if (!envio.isValid()) {
      throw new Error('Datos del envío inválidos');
    }

    envio.calcularPrecioFinal();

    return await this.envioMaritimoRepository.update(id, envio);
  }
}
