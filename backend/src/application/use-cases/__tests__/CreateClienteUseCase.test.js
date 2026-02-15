/**
 * Pruebas unitarias para CreateClienteUseCase
 * Valida todos los escenarios de error
 */
import { CreateClienteUseCase } from '../cliente/CreateClienteUseCase.js';

describe('CreateClienteUseCase', () => {
  let useCase;
  let mockClienteRepository;

  beforeEach(() => {
    mockClienteRepository = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };
    useCase = new CreateClienteUseCase(mockClienteRepository);
  });

  describe('Escenarios de error', () => {
    it('debe lanzar error si el email ya existe', async () => {
      const clienteData = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com'
      };

      mockClienteRepository.findByEmail.mockResolvedValue({
        id: 1,
        email: 'juan@example.com'
      });

      await expect(useCase.execute(clienteData)).rejects.toThrow('El email ya está registrado');
      expect(mockClienteRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
    });

    it('debe lanzar error si los datos del cliente son inválidos', async () => {
      const clienteData = {
        nombre: '', // Nombre vacío
        email: 'juan@example.com'
      };

      mockClienteRepository.findByEmail.mockResolvedValue(null);

      await expect(useCase.execute(clienteData)).rejects.toThrow('Datos del cliente inválidos');
    });

    it('debe lanzar error si el email es inválido', async () => {
      const clienteData = {
        nombre: 'Juan Pérez',
        email: 'email-invalido' // Email sin formato válido
      };

      mockClienteRepository.findByEmail.mockResolvedValue(null);

      await expect(useCase.execute(clienteData)).rejects.toThrow('Datos del cliente inválidos');
    });
  });

  describe('Escenarios exitosos', () => {
    it('debe crear cliente exitosamente con datos válidos', async () => {
      const clienteData = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono: '1234567890'
      };

      const clienteCreado = {
        id: 1,
        ...clienteData
      };

      mockClienteRepository.findByEmail.mockResolvedValue(null);
      mockClienteRepository.create.mockResolvedValue(clienteCreado);

      const result = await useCase.execute(clienteData);

      expect(result).toEqual(clienteCreado);
      expect(mockClienteRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
      expect(mockClienteRepository.create).toHaveBeenCalled();
    });
  });
});
