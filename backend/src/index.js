/**
 * Archivo principal de la aplicación
 * Configura Express y conecta todas las capas
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './infrastructure/middleware/errorHandler.js';

// Importar repositorios
import { MySQLClienteRepository } from './infrastructure/repositories/MySQLClienteRepository.js';
import { MySQLProductoRepository } from './infrastructure/repositories/MySQLProductoRepository.js';
import { MySQLBodegaRepository } from './infrastructure/repositories/MySQLBodegaRepository.js';
import { MySQLPuertoRepository } from './infrastructure/repositories/MySQLPuertoRepository.js';
import { MySQLEnvioTerrestreRepository } from './infrastructure/repositories/MySQLEnvioTerrestreRepository.js';
import { MySQLEnvioMaritimoRepository } from './infrastructure/repositories/MySQLEnvioMaritimoRepository.js';

// Importar casos de uso
import { CreateClienteUseCase } from './application/use-cases/cliente/CreateClienteUseCase.js';
import { GetClienteUseCase } from './application/use-cases/cliente/GetClienteUseCase.js';
import { GetAllClientesUseCase } from './application/use-cases/cliente/GetAllClientesUseCase.js';
import { CreateProductoUseCase } from './application/use-cases/producto/CreateProductoUseCase.js';
import { GetAllProductosUseCase } from './application/use-cases/producto/GetAllProductosUseCase.js';
import { CreateBodegaUseCase } from './application/use-cases/bodega/CreateBodegaUseCase.js';
import { GetAllBodegasUseCase } from './application/use-cases/bodega/GetAllBodegasUseCase.js';
import { CreatePuertoUseCase } from './application/use-cases/puerto/CreatePuertoUseCase.js';
import { GetAllPuertosUseCase } from './application/use-cases/puerto/GetAllPuertosUseCase.js';
import { CreateEnvioTerrestreUseCase } from './application/use-cases/envio-terrestre/CreateEnvioTerrestreUseCase.js';
import { GetAllEnviosTerrestresUseCase } from './application/use-cases/envio-terrestre/GetAllEnviosTerrestresUseCase.js';
import { CreateEnvioMaritimoUseCase } from './application/use-cases/envio-maritimo/CreateEnvioMaritimoUseCase.js';
import { GetAllEnviosMaritimosUseCase } from './application/use-cases/envio-maritimo/GetAllEnviosMaritimosUseCase.js';

// Importar rutas
import { createClienteRoutes } from './presentation/routes/clienteRoutes.js';
import { createProductoRoutes } from './presentation/routes/productoRoutes.js';
import { createBodegaRoutes } from './presentation/routes/bodegaRoutes.js';
import { createPuertoRoutes } from './presentation/routes/puertoRoutes.js';
import { createEnvioTerrestreRoutes } from './presentation/routes/envioTerrestreRoutes.js';
import { createEnvioMaritimoRoutes } from './presentation/routes/envioMaritimoRoutes.js';
import { createAuthRoutes } from './presentation/routes/authRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Validar variables de entorno críticas al inicio
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
  console.error('❌ ERROR: JWT_SECRET no está configurado en el archivo .env');
  console.error('Por favor, crea un archivo .env en la carpeta backend/ con la siguiente configuración:');
  console.error('JWT_SECRET=tu_clave_secreta_muy_larga_y_segura_aqui');
  console.error('JWT_EXPIRES_IN=24h');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar repositorios (Inyección de Dependencias)
const clienteRepository = new MySQLClienteRepository();
const productoRepository = new MySQLProductoRepository();
const bodegaRepository = new MySQLBodegaRepository();
const puertoRepository = new MySQLPuertoRepository();
const envioTerrestreRepository = new MySQLEnvioTerrestreRepository();
const envioMaritimoRepository = new MySQLEnvioMaritimoRepository();

// Inicializar casos de uso (Inyección de Dependencias)
const createClienteUseCase = new CreateClienteUseCase(clienteRepository);
const getClienteUseCase = new GetClienteUseCase(clienteRepository);
const getAllClientesUseCase = new GetAllClientesUseCase(clienteRepository);
const createProductoUseCase = new CreateProductoUseCase(productoRepository);
const getAllProductosUseCase = new GetAllProductosUseCase(productoRepository);
const createBodegaUseCase = new CreateBodegaUseCase(bodegaRepository);
const getAllBodegasUseCase = new GetAllBodegasUseCase(bodegaRepository);
const createPuertoUseCase = new CreatePuertoUseCase(puertoRepository);
const getAllPuertosUseCase = new GetAllPuertosUseCase(puertoRepository);
const createEnvioTerrestreUseCase = new CreateEnvioTerrestreUseCase(
  envioTerrestreRepository,
  clienteRepository,
  productoRepository,
  bodegaRepository
);
const getAllEnviosTerrestresUseCase = new GetAllEnviosTerrestresUseCase(envioTerrestreRepository);
const createEnvioMaritimoUseCase = new CreateEnvioMaritimoUseCase(
  envioMaritimoRepository,
  clienteRepository,
  productoRepository,
  puertoRepository
);
const getAllEnviosMaritimosUseCase = new GetAllEnviosMaritimosUseCase(envioMaritimoRepository);

// Dependencias para las rutas
const dependencies = {
  createClienteUseCase,
  getClienteUseCase,
  getAllClientesUseCase,
  createProductoUseCase,
  getAllProductosUseCase,
  createBodegaUseCase,
  getAllBodegasUseCase,
  createPuertoUseCase,
  getAllPuertosUseCase,
  createEnvioTerrestreUseCase,
  getAllEnviosTerrestresUseCase,
  createEnvioMaritimoUseCase,
  getAllEnviosMaritimosUseCase
};

// Rutas
app.use('/api/auth', createAuthRoutes());
app.use('/api/clientes', createClienteRoutes(dependencies));
app.use('/api/productos', createProductoRoutes(dependencies));
app.use('/api/bodegas', createBodegaRoutes(dependencies));
app.use('/api/puertos', createPuertoRoutes(dependencies));
app.use('/api/envios-terrestres', createEnvioTerrestreRoutes(dependencies));
app.use('/api/envios-maritimos', createEnvioMaritimoRoutes(dependencies));

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API de Logística funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación de API disponible en /health`);
  console.log(`🔐 Endpoint de autenticación: POST /api/auth/login`);
});

export default app;
