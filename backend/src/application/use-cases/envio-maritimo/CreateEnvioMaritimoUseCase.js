/**
 * Caso de Uso: Crear Envío Marítimo
 * Implementa la lógica de negocio para crear un envío marítimo
 */
export class CreateEnvioMaritimoUseCase {
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

  async execute(envioData) {
    // Validar que el cliente exista
    const cliente = await this.clienteRepository.findById(envioData.clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    // Validar que el producto exista
    const producto = await this.productoRepository.findById(envioData.productoId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    // Validar que el puerto exista
    const puerto = await this.puertoRepository.findById(envioData.puertoId);
    if (!puerto) {
      throw new Error('Puerto no encontrado');
    }

    // Validar que el número de guía sea único
    const existingGuia = await this.envioMaritimoRepository.findByNumeroGuia(envioData.numeroGuia);
    if (existingGuia) {
      throw new Error('El número de guía ya existe');
    }

    // Crear entidad de dominio
    const EnvioMaritimo = (await import('../../../domain/entities/EnvioMaritimo.js')).EnvioMaritimo;
    const envio = new EnvioMaritimo(envioData);

    // Validar entidad
    if (!envio.isValid()) {
      throw new Error('Datos del envío inválidos');
    }

    // Calcular precio final con descuento
    envio.calcularPrecioFinal();

    // Persistir
    return await this.envioMaritimoRepository.create(envio);
  }
}
