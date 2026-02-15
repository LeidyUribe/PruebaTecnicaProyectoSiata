# Documentación Técnica - Sistema de Logística

## 🏛️ Arquitectura

### Clean Architecture

El proyecto implementa **Clean Architecture** con separación clara de responsabilidades:

#### 1. **Capa de Dominio** (`domain/`)
- **Entidades**: Representan las reglas de negocio puras
- **Repositorios (Interfaces)**: Contratos que definen cómo acceder a datos
- **Independiente**: No depende de frameworks ni tecnologías externas

**Entidades implementadas:**
- `Cliente`: Valida email y datos básicos
- `Producto`: Valida tipo de producto
- `Bodega`: Valida datos de bodega
- `Puerto`: Valida datos de puerto
- `EnvioTerrestre`: Implementa reglas de negocio (placa, guía, descuentos)
- `EnvioMaritimo`: Implementa reglas de negocio (flota, guía, descuentos)

#### 2. **Capa de Aplicación** (`application/`)
- **Casos de Uso**: Orquestan la lógica de negocio
- **Servicios de Aplicación**: Coordinan entre repositorios
- **Independiente**: No conoce detalles de infraestructura

**Casos de uso implementados:**
- `CreateClienteUseCase`: Valida email único y crea cliente
- `CreateEnvioTerrestreUseCase`: Valida relaciones y reglas de negocio
- `CreateEnvioMaritimoUseCase`: Valida relaciones y reglas de negocio
- Casos de uso para obtener listados (GetAll)

#### 3. **Capa de Infraestructura** (`infrastructure/`)
- **Repositorios MySQL**: Implementaciones concretas de los repositorios
- **Conexión a BD**: Gestión de pool de conexiones
- **Middlewares**: Autenticación, manejo de errores

**Implementaciones:**
- `MySQLClienteRepository`: Implementa `IClienteRepository`
- `MySQLEnvioTerrestreRepository`: Implementa `IEnvioTerrestreRepository`
- `MySQLEnvioMaritimoRepository`: Implementa `IEnvioMaritimoRepository`
- `authMiddleware`: Valida tokens JWT
- `errorHandler`: Manejo centralizado de errores

#### 4. **Capa de Presentación** (`presentation/`)
- **Controladores**: Manejan peticiones HTTP
- **Rutas**: Define endpoints REST
- **Validadores**: Validación de entrada con express-validator

**Controladores:**
- `ClienteController`: Maneja CRUD de clientes
- `EnvioTerrestreController`: Maneja creación y listado
- `EnvioMaritimoController`: Maneja creación y listado

## 🎯 Principios SOLID Aplicados

### 1. **Single Responsibility Principle (SRP)**
Cada clase tiene una única responsabilidad:
- **Entidades**: Solo validan sus propios datos
- **Repositorios**: Solo gestionan persistencia
- **Casos de Uso**: Solo orquestan una operación de negocio
- **Controladores**: Solo manejan peticiones HTTP

### 2. **Open/Closed Principle (OCP)**
- Las interfaces de repositorios permiten cambiar implementaciones sin modificar código
- Se puede cambiar de MySQL a MongoDB sin afectar casos de uso

### 3. **Liskov Substitution Principle (LSP)**
- Las implementaciones de repositorios pueden sustituirse sin romper el código
- `MySQLClienteRepository` puede reemplazarse por cualquier implementación de `IClienteRepository`

### 4. **Interface Segregation Principle (ISP)**
- Interfaces específicas por entidad (`IClienteRepository`, `IProductoRepository`)
- No se fuerza a implementar métodos innecesarios

### 5. **Dependency Inversion Principle (DIP)**
- Los casos de uso dependen de abstracciones (interfaces), no de implementaciones
- La inyección de dependencias se realiza en `index.js`

**Ejemplo:**
```javascript
// Caso de uso depende de la interfaz, no de la implementación
class CreateClienteUseCase {
  constructor(clienteRepository) { // Interfaz, no implementación
    this.clienteRepository = clienteRepository;
  }
}
```

## 🧹 Clean Code

### Nombres Descriptivos
- `CreateEnvioTerrestreUseCase`: Nombre claro de su propósito
- `isValidPlaca`: Método que valida placa
- `calcularPrecioFinal`: Método que calcula precio

### Funciones Pequeñas
- Cada método hace una sola cosa
- Validaciones separadas en métodos específicos

### Comentarios Útiles
- Documentación JSDoc en entidades y casos de uso
- Explicación de reglas de negocio

### Manejo de Errores
- Errores específicos y descriptivos
- Middleware centralizado de errores

## 🔒 Seguridad

### Autenticación JWT
- **Middleware**: `authMiddleware` valida tokens en todas las rutas protegidas
- **Formato**: `Authorization: Bearer <token>`
- **Validación**: Verifica firma, expiración y formato

### Validaciones
- **Frontend**: Validación de formularios con HTML5 y React
- **Backend**: Validación con express-validator
- **Dominio**: Validaciones en entidades

## 📊 Base de Datos

### Diseño
- **Normalización**: Tablas normalizadas con relaciones FK
- **Constraints**: Validaciones a nivel de BD (CHECK, UNIQUE)
- **Índices**: Índices en campos de búsqueda frecuente

### Migraciones
- Script SQL para creación de tablas
- Constraints de validación (placa, flota, fechas)

## ✅ Validaciones Implementadas

### Envío Terrestre
1. **Placa Vehículo**: Regex `/^[A-Z]{3}[0-9]{3}$/i`
2. **Número Guía**: 10 caracteres alfanuméricos únicos
3. **Cantidad**: Entero positivo
4. **Fechas**: Entrega >= Registro
5. **Relaciones**: Cliente, Producto y Bodega deben existir
6. **Descuento**: Automático 5% si cantidad > 10

### Envío Marítimo
1. **Número Flota**: Regex `/^[A-Z]{3}[0-9]{4}[A-Z]{1}$/i`
2. **Número Guía**: 10 caracteres alfanuméricos únicos
3. **Cantidad**: Entero positivo
4. **Fechas**: Entrega >= Registro
5. **Relaciones**: Cliente, Producto y Puerto deben existir
6. **Descuento**: Automático 3% si cantidad > 10

## 🧪 Pruebas Unitarias

### Cobertura
- Pruebas de entidades (`EnvioTerrestre`, `EnvioMaritimo`)
- Validación de reglas de negocio
- Cálculo de descuentos
- Validación de formatos

### Framework
- **Jest**: Framework de testing
- Configuración en `jest.config.js`

## 🔄 Flujo de Datos

1. **Request HTTP** → Rutas (`presentation/routes`)
2. **Validación** → Validadores (`presentation/validators`)
3. **Autenticación** → Middleware (`infrastructure/middleware`)
4. **Controlador** → Maneja request (`presentation/controllers`)
5. **Caso de Uso** → Orquesta lógica (`application/use-cases`)
6. **Repositorio** → Accede a datos (`infrastructure/repositories`)
7. **Base de Datos** → MySQL
8. **Respuesta** → JSON al cliente

## 📦 Inyección de Dependencias

Todas las dependencias se inyectan en `index.js`:

```javascript
// Repositorios
const clienteRepository = new MySQLClienteRepository();

// Casos de uso
const createClienteUseCase = new CreateClienteUseCase(clienteRepository);

// Controladores (inyectados en rutas)
const dependencies = { createClienteUseCase, ... };
```

## 🎨 Frontend

### Arquitectura
- **Componentes**: Reutilizables y modulares
- **Servicios**: Separación de lógica de API
- **Páginas**: Componentes de página
- **Routing**: React Router con protección de rutas

### Estado
- **Local State**: useState para estado de componentes
- **Autenticación**: localStorage para token

## 🚀 Mejoras Futuras

1. **Autenticación Real**: Sistema de usuarios y contraseñas
2. **Paginación**: En listados grandes
3. **Filtros y Búsqueda**: En tablas
4. **Edición y Eliminación**: CRUD completo
5. **Reportes**: Generación de reportes
6. **Logs**: Sistema de logging estructurado
7. **Docker**: Containerización
8. **CI/CD**: Pipeline de despliegue

## 📝 Decisiones Técnicas

### ¿Por qué Clean Architecture?
- **Mantenibilidad**: Fácil de mantener y extender
- **Testabilidad**: Fácil de probar cada capa
- **Independencia**: Cambios en una capa no afectan otras

### ¿Por qué MySQL?
- Requisito del proyecto
- Fácil migración a otros SGBD gracias a interfaces

### ¿Por qué Express-Validator?
- Validación robusta y declarativa
- Mensajes de error claros
- Integración fácil con Express

### ¿Por qué JWT?
- Stateless: No requiere sesiones en servidor
- Escalable: Funciona con múltiples servidores
- Estándar: Ampliamente adoptado
