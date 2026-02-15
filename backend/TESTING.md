# 🧪 Guía de Pruebas Unitarias

## 📍 Ubicación de las Pruebas

Las pruebas unitarias están ubicadas en:
```
backend/src/domain/entities/__tests__/
```

## 📋 Pruebas Implementadas

### ✅ Entidades con Pruebas

1. **Cliente.test.js** - Pruebas de validación de cliente y email
2. **Producto.test.js** - Pruebas de validación de producto
3. **Bodega.test.js** - Pruebas de validación de bodega
4. **Puerto.test.js** - Pruebas de validación de puerto
5. **EnvioTerrestre.test.js** - Pruebas de reglas de negocio terrestres
6. **EnvioMaritimo.test.js** - Pruebas de reglas de negocio marítimas

## 🚀 Ejecutar Pruebas

### Ejecutar todas las pruebas
```bash
cd backend
npm test
```

### Ejecutar pruebas en modo watch (desarrollo)
```bash
npm run test:watch
```

### Ejecutar pruebas específicas
```bash
# Ejecutar solo pruebas de Cliente
npm test -- Cliente.test.js

# Ejecutar solo pruebas de Envíos Terrestres
npm test -- EnvioTerrestre.test.js
```

## 📊 Cobertura de Código

Las pruebas generan un reporte de cobertura en:
```
backend/coverage/
```

Para ver el reporte, abre `coverage/lcov-report/index.html` en tu navegador.

## 🎯 Cobertura Actual

### Entidades de Dominio
- ✅ Cliente: Validación de datos y email
- ✅ Producto: Validación de tipo
- ✅ Bodega: Validación de nombre y dirección
- ✅ Puerto: Validación de nombre y ubicación
- ✅ EnvioTerrestre: Validación completa + reglas de negocio
- ✅ EnvioMaritimo: Validación completa + reglas de negocio

### Reglas de Negocio Probadas

#### Envíos Terrestres
- ✅ Validación de placa (3 letras + 3 números)
- ✅ Validación de número de guía (10 caracteres alfanuméricos)
- ✅ Cálculo de descuento (5% si cantidad > 10)
- ✅ Cálculo de precio final con descuento

#### Envíos Marítimos
- ✅ Validación de número de flota (3 letras + 4 números + 1 letra)
- ✅ Validación de número de guía (10 caracteres alfanuméricos)
- ✅ Cálculo de descuento (3% si cantidad > 10)
- ✅ Cálculo de precio final con descuento

## 📝 Estructura de las Pruebas

Cada archivo de prueba sigue esta estructura:

```javascript
describe('NombreEntidad', () => {
  let instancia;

  beforeEach(() => {
    // Configuración inicial
  });

  describe('método', () => {
    test('debe hacer algo específico', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## 🔧 Configuración

Jest está configurado en `jest.config.js` para:
- ✅ Soportar ES Modules
- ✅ Ejecutar pruebas en Node.js
- ✅ Generar reportes de cobertura
- ✅ Buscar pruebas en `__tests__` y archivos `.test.js`

## 🚧 Pruebas Futuras (Opcional)

Para mejorar la cobertura, se pueden agregar:
- Pruebas de casos de uso (use cases)
- Pruebas de integración
- Pruebas de controladores
- Pruebas de repositorios (con mocks)

## ⚠️ Nota sobre ES Modules

El proyecto usa ES Modules (`"type": "module"`), por lo que Jest requiere la flag `--experimental-vm-modules`. Esto ya está configurado en los scripts de `package.json`.

Si encuentras problemas, asegúrate de tener Node.js >= 18.
