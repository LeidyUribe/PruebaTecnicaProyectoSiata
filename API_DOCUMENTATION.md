# 📚 Documentación API RESTful - Sistema de Logística

## 📋 Tabla de Contenidos

1. [Información General](#información-general)
2. [Autenticación](#autenticación)
3. [Base URL](#base-url)
4. [Códigos de Estado HTTP](#códigos-de-estado-http)
5. [Formato de Respuesta](#formato-de-respuesta)
6. [Endpoints](#endpoints)
   - [Autenticación](#1-autenticación)
   - [Clientes](#2-clientes)
   - [Productos](#3-productos)
   - [Bodegas](#4-bodegas)
   - [Puertos](#5-puertos)
   - [Envíos Terrestres](#6-envíos-terrestres)
   - [Envíos Marítimos](#7-envíos-marítimos)
7. [Modelos de Datos](#modelos-de-datos)
8. [Errores](#errores)
9. [Buenas Prácticas](#buenas-prácticas)

---

## 📖 Información General

### Descripción
API RESTful para la gestión de logística terrestre y marítima. Permite gestionar clientes, productos, bodegas, puertos y envíos con sus respectivas reglas de negocio.

### Versión
**v1.0.0**

### Tecnologías
- Node.js + Express
- MySQL
- JWT para autenticación

---

## 🔐 Autenticación

La API utiliza **Bearer Token** (JWT) para autenticación. Todas las rutas (excepto `/api/auth/login`) requieren autenticación.

### Cómo obtener un token

1. Realizar POST a `/api/auth/login`
2. Obtener el token de la respuesta
3. Incluir el token en todas las peticiones:

```
Authorization: Bearer <token>
```

### Ejemplo de Header

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🌐 Base URL

```
http://localhost:3000/api
```

**Producción:**
```
https://api.tudominio.com/api
```

---

## 📊 Códigos de Estado HTTP

| Código | Descripción | Uso |
|--------|-------------|-----|
| **200** | OK | Petición exitosa |
| **201** | Created | Recurso creado exitosamente |
| **400** | Bad Request | Error de validación o datos inválidos |
| **401** | Unauthorized | Token inválido o faltante |
| **404** | Not Found | Recurso no encontrado |
| **409** | Conflict | Recurso duplicado (email, guía, etc.) |
| **500** | Internal Server Error | Error interno del servidor |

---

## 📦 Formato de Respuesta

### Respuesta Exitosa

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... },
  "count": 10  // Solo en listados
}
```

### Respuesta de Error

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [  // Solo en errores de validación
    {
      "field": "email",
      "message": "El email es requerido"
    }
  ]
}
```

---

## 🛣️ Endpoints

### 1. Autenticación

#### POST `/api/auth/login`

Genera un token JWT para autenticación.

**No requiere autenticación**

**Request Body:**
```json
{}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Token generado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json"
```

---

### 2. Clientes

#### GET `/api/clientes`

Obtiene todos los clientes.

**Requiere autenticación**

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "1234567890",
      "direccion": "Calle 123",
      "fechaCreacion": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Ejemplo con cURL:**
```bash
curl -X GET http://localhost:3000/api/clientes \
  -H "Authorization: Bearer <token>"
```

---

#### GET `/api/clientes/:id`

Obtiene un cliente por ID.

**Requiere autenticación**

**Parámetros de URL:**
- `id` (integer, requerido): ID del cliente

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "direccion": "Calle 123",
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

**Ejemplo con cURL:**
```bash
curl -X GET http://localhost:3000/api/clientes/1 \
  -H "Authorization: Bearer <token>"
```

---

#### POST `/api/clientes`

Crea un nuevo cliente.

**Requiere autenticación**

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "1234567890",  // Opcional
  "direccion": "Calle 123"   // Opcional
}
```

**Validaciones:**
- `nombre` (string, requerido, 2-255 caracteres)
- `email` (string, requerido, formato email válido, único)
- `telefono` (string, opcional, máximo 50 caracteres)
- `direccion` (string, opcional)

**Response 201:**
```json
{
  "success": true,
  "message": "Cliente creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "direccion": "Calle 123",
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 400 (Validación):**
```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": [
    {
      "field": "email",
      "message": "El email debe tener un formato válido"
    }
  ]
}
```

**Response 409 (Email duplicado):**
```json
{
  "success": false,
  "message": "El email ya está registrado"
}
```

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "direccion": "Calle 123"
  }'
```

---

### 3. Productos

#### GET `/api/productos`

Obtiene todos los productos.

**Requiere autenticación**

**Response 200:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "tipo": "Electrónico",
      "descripcion": "Producto electrónico de alta calidad",
      "fechaCreacion": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/productos`

Crea un nuevo producto.

**Requiere autenticación**

**Request Body:**
```json
{
  "tipo": "Electrónico",
  "descripcion": "Producto electrónico de alta calidad"  // Opcional
}
```

**Validaciones:**
- `tipo` (string, requerido, 1-255 caracteres)
- `descripcion` (string, opcional)

**Response 201:**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 1,
    "tipo": "Electrónico",
    "descripcion": "Producto electrónico de alta calidad",
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Bodegas

#### GET `/api/bodegas`

Obtiene todas las bodegas.

**Requiere autenticación**

**Response 200:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "nombre": "Bodega Central",
      "direccion": "Calle Principal 123",
      "ciudad": "Bogotá",
      "fechaCreacion": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/bodegas`

Crea una nueva bodega.

**Requiere autenticación**

**Request Body:**
```json
{
  "nombre": "Bodega Central",
  "direccion": "Calle Principal 123",
  "ciudad": "Bogotá"  // Opcional
}
```

**Validaciones:**
- `nombre` (string, requerido, 1-255 caracteres)
- `direccion` (string, requerido)
- `ciudad` (string, opcional)

**Response 201:**
```json
{
  "success": true,
  "message": "Bodega creada exitosamente",
  "data": {
    "id": 1,
    "nombre": "Bodega Central",
    "direccion": "Calle Principal 123",
    "ciudad": "Bogotá",
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 5. Puertos

#### GET `/api/puertos`

Obtiene todos los puertos.

**Requiere autenticación**

**Response 200:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "nombre": "Puerto de Cartagena",
      "ubicacion": "Cartagena, Colombia",
      "pais": "Colombia",
      "fechaCreacion": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/puertos`

Crea un nuevo puerto.

**Requiere autenticación**

**Request Body:**
```json
{
  "nombre": "Puerto de Cartagena",
  "ubicacion": "Cartagena, Colombia",
  "pais": "Colombia"  // Opcional
}
```

**Validaciones:**
- `nombre` (string, requerido, 1-255 caracteres)
- `ubicacion` (string, requerido)
- `pais` (string, opcional)

**Response 201:**
```json
{
  "success": true,
  "message": "Puerto creado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Puerto de Cartagena",
    "ubicacion": "Cartagena, Colombia",
    "pais": "Colombia",
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 6. Envíos Terrestres

#### GET `/api/envios-terrestres`

Obtiene todos los envíos terrestres.

**Requiere autenticación**

**Response 200:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "clienteId": 1,
      "productoId": 1,
      "cantidad": 15,
      "fechaRegistro": "2024-01-01",
      "fechaEntrega": "2024-01-05",
      "bodegaId": 1,
      "precioEnvio": 1000.00,
      "placaVehiculo": "ABC123",
      "numeroGuia": "GUIA123456",
      "descuento": 0.05,
      "precioFinal": 950.00,
      "fechaCreacion": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/envios-terrestres`

Crea un nuevo envío terrestre.

**Requiere autenticación**

**Request Body:**
```json
{
  "clienteId": 1,
  "productoId": 1,
  "cantidad": 15,
  "fechaRegistro": "2024-01-01",
  "fechaEntrega": "2024-01-05",
  "bodegaId": 1,
  "precioEnvio": 1000.00,
  "placaVehiculo": "ABC123",
  "numeroGuia": "GUIA123456"
}
```

**Validaciones:**
- `clienteId` (integer, requerido, > 0)
- `productoId` (integer, requerido, > 0)
- `cantidad` (integer, requerido, > 0)
- `fechaRegistro` (date, requerido, formato YYYY-MM-DD)
- `fechaEntrega` (date, requerido, formato YYYY-MM-DD, >= fechaRegistro)
- `bodegaId` (integer, requerido, > 0)
- `precioEnvio` (float, requerido, > 0)
- `placaVehiculo` (string, requerido, formato: 3 letras + 3 números, ej: ABC123)
- `numeroGuia` (string, requerido, 10 caracteres alfanuméricos, único)

**Reglas de Negocio:**
- ✅ Descuento automático del **5%** si `cantidad > 10`
- ✅ El número de guía debe ser único
- ✅ La fecha de entrega debe ser >= fecha de registro
- ✅ Cliente, Producto y Bodega deben existir

**Response 201:**
```json
{
  "success": true,
  "message": "Envío terrestre creado exitosamente",
  "data": {
    "id": 1,
    "clienteId": 1,
    "productoId": 1,
    "cantidad": 15,
    "fechaRegistro": "2024-01-01",
    "fechaEntrega": "2024-01-05",
    "bodegaId": 1,
    "precioEnvio": 1000.00,
    "placaVehiculo": "ABC123",
    "numeroGuia": "GUIA123456",
    "descuento": 0.05,
    "precioFinal": 950.00,
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 400 (Validación):**
```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": [
    {
      "field": "placaVehiculo",
      "message": "La placa debe tener formato: 3 letras + 3 números (ej: ABC123)"
    }
  ]
}
```

**Response 404 (Recurso no encontrado):**
```json
{
  "success": false,
  "message": "Cliente no encontrado"
}
```

**Response 409 (Número de guía duplicado):**
```json
{
  "success": false,
  "message": "El número de guía ya existe"
}
```

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/envios-terrestres \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "productoId": 1,
    "cantidad": 15,
    "fechaRegistro": "2024-01-01",
    "fechaEntrega": "2024-01-05",
    "bodegaId": 1,
    "precioEnvio": 1000.00,
    "placaVehiculo": "ABC123",
    "numeroGuia": "GUIA123456"
  }'
```

---

### 7. Envíos Marítimos

#### GET `/api/envios-maritimos`

Obtiene todos los envíos marítimos.

**Requiere autenticación**

**Response 200:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "clienteId": 1,
      "productoId": 1,
      "cantidad": 15,
      "fechaRegistro": "2024-01-01",
      "fechaEntrega": "2024-01-10",
      "puertoId": 1,
      "precioEnvio": 2000.00,
      "numeroFlota": "ABC1234D",
      "numeroGuia": "GUIA123456",
      "descuento": 0.03,
      "precioFinal": 1940.00,
      "fechaCreacion": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### POST `/api/envios-maritimos`

Crea un nuevo envío marítimo.

**Requiere autenticación**

**Request Body:**
```json
{
  "clienteId": 1,
  "productoId": 1,
  "cantidad": 15,
  "fechaRegistro": "2024-01-01",
  "fechaEntrega": "2024-01-10",
  "puertoId": 1,
  "precioEnvio": 2000.00,
  "numeroFlota": "ABC1234D",
  "numeroGuia": "GUIA123456"
}
```

**Validaciones:**
- `clienteId` (integer, requerido, > 0)
- `productoId` (integer, requerido, > 0)
- `cantidad` (integer, requerido, > 0)
- `fechaRegistro` (date, requerido, formato YYYY-MM-DD)
- `fechaEntrega` (date, requerido, formato YYYY-MM-DD, >= fechaRegistro)
- `puertoId` (integer, requerido, > 0)
- `precioEnvio` (float, requerido, > 0)
- `numeroFlota` (string, requerido, formato: 3 letras + 4 números + 1 letra, ej: ABC1234D)
- `numeroGuia` (string, requerido, 10 caracteres alfanuméricos, único)

**Reglas de Negocio:**
- ✅ Descuento automático del **3%** si `cantidad > 10`
- ✅ El número de guía debe ser único
- ✅ La fecha de entrega debe ser >= fecha de registro
- ✅ Cliente, Producto y Puerto deben existir

**Response 201:**
```json
{
  "success": true,
  "message": "Envío marítimo creado exitosamente",
  "data": {
    "id": 1,
    "clienteId": 1,
    "productoId": 1,
    "cantidad": 15,
    "fechaRegistro": "2024-01-01",
    "fechaEntrega": "2024-01-10",
    "puertoId": 1,
    "precioEnvio": 2000.00,
    "numeroFlota": "ABC1234D",
    "numeroGuia": "GUIA123456",
    "descuento": 0.03,
    "precioFinal": 1940.00,
    "fechaCreacion": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 400 (Validación):**
```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": [
    {
      "field": "numeroFlota",
      "message": "El número de flota debe tener formato: 3 letras + 4 números + 1 letra (ej: ABC1234D)"
    }
  ]
}
```

**Response 404 (Recurso no encontrado):**
```json
{
  "success": false,
  "message": "Puerto no encontrado"
}
```

**Response 409 (Número de guía duplicado):**
```json
{
  "success": false,
  "message": "El número de guía ya existe"
}
```

---

## 📋 Modelos de Datos

### Cliente
```typescript
{
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaCreacion: Date;
}
```

### Producto
```typescript
{
  id: number;
  tipo: string;
  descripcion?: string;
  fechaCreacion: Date;
}
```

### Bodega
```typescript
{
  id: number;
  nombre: string;
  direccion: string;
  ciudad?: string;
  fechaCreacion: Date;
}
```

### Puerto
```typescript
{
  id: number;
  nombre: string;
  ubicacion: string;
  pais?: string;
  fechaCreacion: Date;
}
```

### Envío Terrestre
```typescript
{
  id: number;
  clienteId: number;
  productoId: number;
  cantidad: number;
  fechaRegistro: string; // YYYY-MM-DD
  fechaEntrega: string; // YYYY-MM-DD
  bodegaId: number;
  precioEnvio: number;
  placaVehiculo: string; // Formato: ABC123
  numeroGuia: string; // 10 caracteres alfanuméricos
  descuento: number; // 0.05 si cantidad > 10
  precioFinal: number;
  fechaCreacion: Date;
}
```

### Envío Marítimo
```typescript
{
  id: number;
  clienteId: number;
  productoId: number;
  cantidad: number;
  fechaRegistro: string; // YYYY-MM-DD
  fechaEntrega: string; // YYYY-MM-DD
  puertoId: number;
  precioEnvio: number;
  numeroFlota: string; // Formato: ABC1234D
  numeroGuia: string; // 10 caracteres alfanuméricos
  descuento: number; // 0.03 si cantidad > 10
  precioFinal: number;
  fechaCreacion: Date;
}
```

---

## ⚠️ Errores

### Formato de Error

Todos los errores siguen este formato:

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [  // Solo en errores de validación
    {
      "field": "campo",
      "message": "Mensaje de error específico"
    }
  ]
}
```

### Códigos de Error Comunes

| Código | Mensaje | Causa |
|--------|---------|-------|
| 400 | Errores de validación | Datos de entrada inválidos |
| 400 | Datos del envío inválidos | Validación de entidad fallida |
| 401 | Token de autenticación requerido | Header Authorization faltante |
| 401 | Token inválido | Token malformado o incorrecto |
| 401 | Token expirado | Token JWT expirado |
| 404 | Cliente no encontrado | ID de cliente inexistente |
| 404 | Producto no encontrado | ID de producto inexistente |
| 404 | Bodega no encontrada | ID de bodega inexistente |
| 404 | Puerto no encontrado | ID de puerto inexistente |
| 409 | El email ya está registrado | Email duplicado |
| 409 | El número de guía ya existe | Número de guía duplicado |
| 500 | Error interno del servidor | Error no manejado |

---

## ✅ Buenas Prácticas

### 1. Convenciones REST

- ✅ **Nombres en plural**: `/api/clientes`, `/api/productos`
- ✅ **Verbos HTTP correctos**: GET (leer), POST (crear)
- ✅ **Códigos de estado apropiados**: 200, 201, 400, 401, 404, 409, 500
- ✅ **Recursos anidados**: `/api/envios-terrestres`, `/api/envios-maritimos`

### 2. Autenticación

- ✅ **Bearer Token** en todas las rutas protegidas
- ✅ **Header Authorization** requerido: `Authorization: Bearer <token>`
- ✅ **Validación de token** en middleware

### 3. Validación

- ✅ **Validación de entrada** con express-validator
- ✅ **Validación de negocio** en casos de uso
- ✅ **Validación de entidades** en dominio
- ✅ **Mensajes de error claros** y descriptivos

### 4. Respuestas

- ✅ **Formato consistente** en todas las respuestas
- ✅ **Incluir `success`** en todas las respuestas
- ✅ **Mensajes descriptivos** para el usuario
- ✅ **Datos estructurados** en `data`

### 5. Manejo de Errores

- ✅ **ErrorHandler centralizado** para todos los errores
- ✅ **Códigos HTTP apropiados** según el tipo de error
- ✅ **Mensajes de error claros** y útiles
- ✅ **Logging de errores** en consola

### 6. Seguridad

- ✅ **Autenticación JWT** en todas las rutas protegidas
- ✅ **Validación de entrada** para prevenir inyecciones
- ✅ **CORS configurado** para control de acceso
- ✅ **Variables de entorno** para configuración sensible

### 7. Documentación

- ✅ **Documentación completa** de todos los endpoints
- ✅ **Ejemplos de request/response** para cada endpoint
- ✅ **Códigos de estado** documentados
- ✅ **Validaciones** especificadas

---

## 🔧 Ejemplos de Uso

### Flujo Completo: Crear un Envío Terrestre

```bash
# 1. Obtener token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" | jq -r '.token')

# 2. Crear cliente
CLIENTE_ID=$(curl -X POST http://localhost:3000/api/clientes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }' | jq -r '.data.id')

# 3. Crear producto
PRODUCTO_ID=$(curl -X POST http://localhost:3000/api/productos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "Electrónico"
  }' | jq -r '.data.id')

# 4. Crear bodega
BODEGA_ID=$(curl -X POST http://localhost:3000/api/bodegas \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Bodega Central",
    "direccion": "Calle Principal 123"
  }' | jq -r '.data.id')

# 5. Crear envío terrestre
curl -X POST http://localhost:3000/api/envios-terrestres \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"clienteId\": $CLIENTE_ID,
    \"productoId\": $PRODUCTO_ID,
    \"cantidad\": 15,
    \"fechaRegistro\": \"2024-01-01\",
    \"fechaEntrega\": \"2024-01-05\",
    \"bodegaId\": $BODEGA_ID,
    \"precioEnvio\": 1000.00,
    \"placaVehiculo\": \"ABC123\",
    \"numeroGuia\": \"GUIA123456\"
  }"
```

---

## 📞 Soporte

Para más información o soporte, contactar al equipo de desarrollo.

---

**Última actualización:** 2024-01-01  
**Versión de la API:** v1.0.0
