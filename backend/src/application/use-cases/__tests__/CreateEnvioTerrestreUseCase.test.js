/**
 * Pruebas unitarias para CreateEnvioTerrestreUseCase
 * Valida todos los escenarios de error
 */
import { CreateEnvioTerrestreUseCase } from '../envio-terrestre/CreateEnvioTerrestreUseCase.js';

describe('CreateEnvioTerrestreUseCase', () => {
  let useCase;
  let mockEnvioTerrestreRepository;
  let mockClienteRepository;
  let mockProductoRepository;
  let mockBodegaRepository;

  beforeEach(() => {
    mockEnvioTerrestreRepository = {
      findByNumeroGuia: jest.fn(),
      create: jest.fn()
    };
    mockClienteRepository = {
      findById: jest.fn()
    };
    mockProductoRepository = {
      findById: jest.fn()
    };
    mockBodegaRepository = {
      findById: jest.fn()
    };

    useCase = new CreateEnvioTerrestreUseCase(
      mockEnvioTerrestreRepository,
      mockClienteRepository,
      mockProductoRepository,
      mockBodegaRepository
    );
  });

  describe('Escenarios de error - Validación de relaciones', () => {
    it('debe lanzar error si el cliente no existe', async () => {
      const envioData = {
        clienteId: 999,
        productoId: 1,
        bodegaId: 1,
        numeroGuia: 'GUIA123456'
      };

      mockClienteRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(envioData)).rejects.toThrow('Cliente no encontrado');
      expect(mockClienteRepository.findById).toHaveBeenCalledWith(999);
    });

    it('debe lanzar error si el producto no existe', async () => {
      const envioData = {
        clienteId: 1,
        productoId: 999,
        bodegaId: 1,
        numeroGuia: 'GUIA123456'
      };

      mockClienteRepository.findById.mockResolvedValue({ id: 1 });
      mockProductoRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(envioData)).rejects.toThrow('Producto no encontrado');
    });

    it('debe lanzar error si la bodega no existe', async () => {
      const envioData = {
        clienteId: 1,
        productoId: 1,
        bodegaId: 999,
        numeroGuia: 'GUIA123456'
      };

      mockClienteRepository.findById.mockResolvedValue({ id: 1 });
      mockProductoRepository.findById.mockResolvedValue({ id: 1 });
      mockBodegaRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(envioData)).rejects.toThrow('Bodega no encontrada');
    });
  });

  describe('Escenarios de error - Validación de unicidad', () => {
    it('debe lanzar error si el número de guía ya existe', async () => {
      const envioData = {
        clienteId: 1,
        productoId: 1,
        bodegaId: 1,
        cantidad: 5,
        fechaRegistro: '2024-01-01',
        fechaEntrega: '2024-01-05',
        precioEnvio: 1000,
        placaVehiculo: 'ABC123',
        numeroGuia: 'GUIA123456'
      };

      mockClienteRepository.findById.mockResolvedValue({ id: 1 });
      mockProductoRepository.findById.mockResolvedValue({ id: 1 });
      mockBodegaRepository.findById.mockResolvedValue({ id: 1 });
      mockEnvioTerrestreRepository.findByNumeroGuia.mockResolvedValue({
        id: 1,
        numeroGuia: 'GUIA123456'
      });

      await expect(useCase.execute(envioData)).rejects.toThrow('El número de guía ya existe');
    });
  });

  describe('Escenarios de error - Validación de entidad', () => {
    it('debe lanzar error si los datos del envío son inválidos', async () => {
      const envioData = {
        clienteId: 1,
        productoId: 1,
        bodegaId: 1,
        cantidad: 0, // Cantidad inválida
        fechaRegistro: '2024-01-01',
        fechaEntrega: '2024-01-05',
        precioEnvio: 1000,
        placaVehiculo: 'ABC123',
        numeroGuia: 'GUIA123456'
      };

      mockClienteRepository.findById.mockResolvedValue({ id: 1 });
      mockProductoRepository.findById.mockResolvedValue({ id: 1 });
      mockBodegaRepository.findById.mockResolvedValue({ id: 1 });
      mockEnvioTerrestreRepository.findByNumeroGuia.mockResolvedValue(null);

      await expect(useCase.execute(envioData)).rejects.toThrow('Datos del envío inválidos');
    });

    it('debe lanzar error si la placa es inválida', async () => {
      const envioData = {
        clienteId: 1,
        productoId: 1,
        bodegaId: 1,
        cantidad: 5,
        fechaRegistro: '2024-01-01',
        fechaEntrega: '2024-01-05',
        precioEnvio: 1000,
        placaVehiculo: 'AB123', // Placa inválida
        numeroGuia: 'GUIA123456'
      };

      mockClienteRepository.findById.mockResolvedValue({ id: 1 });
      mockProductoRepository.findById.mockResolvedValue({ id: 1 });
      mockBodegaRepository.findById.mockResolvedValue({ id: 1 });
      mockEnvioTerrestreRepository.findByNumeroGuia.mockResolvedValue(null);

      await expect(useCase.execute(envioData)).rejects.toThrow('Datos del envío inválidos');
    });
  });

  describe('Escenarios exitosos', () => {
    it('debe crear envío terrestre exitosamente', async () => {
      const envioData = {
        clienteId: 1,
        productoId: 1,
        bodegaId: 1,
        cantidad: 5,
        fechaRegistro: '2024-01-01',
        fechaEntrega: '2024-01-05',
        precioEnvio: 1000,
        placaVehiculo: 'ABC123',
        numeroGuia: 'GUIA123456'
      };

      const envioCreado = {
        id: 1,
        ...envioData,
        precioFinal: 1000,
        descuento: 0
      };

      mockClienteRepository.findById.mockResolvedValue({ id: 1 });
      mockProductoRepository.findById.mockResolvedValue({ id: 1 });
      mockBodegaRepository.findById.mockResolvedValue({ id: 1 });
      mockEnvioTerrestreRepository.findByNumeroGuia.mockResolvedValue(null);
      mockEnvioTerrestreRepository.create.mockResolvedValue(envioCreado);

      const result = await useCase.execute(envioData);

      expect(result).toEqual(envioCreado);
      expect(mockEnvioTerrestreRepository.create).toHaveBeenCalled();
    });
  });
});
