/**
 * Configuración de Jest para pruebas unitarias
 * Configurado para soportar ES Modules
 */
export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/infrastructure/database/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000,
  // Mock automático para módulos comunes
  setupFilesAfterEnv: [],
  // Ignorar node_modules excepto para mocks
  modulePathIgnorePatterns: ['<rootDir>/node_modules/']
};
