# 🔐 Sistema de Autenticación y Registro

## 📋 Descripción

El sistema ahora incluye autenticación completa con registro de usuarios y login con validación de credenciales.

## 🆕 Nuevos Endpoints

### POST `/api/usuarios/register`

Registra un nuevo usuario en el sistema.

**No requiere autenticación**

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "nombre": "Juan Pérez",
  "rol": "user"  // Opcional: "user" o "admin", por defecto "user"
}
```

**Validaciones:**
- `email` (string, requerido, formato email válido, único)
- `password` (string, requerido, mínimo 6 caracteres)
- `nombre` (string, requerido, 2-255 caracteres)
- `rol` (string, opcional, "user" o "admin")

**Response 201:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 1,
    "email": "usuario@example.com",
    "nombre": "Juan Pérez",
    "rol": "user",
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
      "field": "password",
      "message": "La contraseña debe tener al menos 6 caracteres"
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

---

### POST `/api/usuarios/login`

Inicia sesión con email y contraseña.

**No requiere autenticación**

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Validaciones:**
- `email` (string, requerido, formato email válido)
- `password` (string, requerido)

**Response 200:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "email": "usuario@example.com",
    "nombre": "Juan Pérez",
    "rol": "user"
  },
  "expiresIn": "24h"
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
      "message": "El email es requerido"
    }
  ]
}
```

**Response 401 (Credenciales inválidas):**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

## 🔄 Endpoint Legacy

### POST `/api/auth/login`

**DEPRECADO** - Mantenido solo para compatibilidad hacia atrás.

Genera un token sin validar credenciales. Se recomienda usar `/api/usuarios/login` en su lugar.

---

## 🔒 Seguridad

### Hash de Contraseñas

- Las contraseñas se hashean usando **bcrypt** con 10 salt rounds
- Las contraseñas nunca se almacenan en texto plano
- Las contraseñas nunca se retornan en las respuestas

### Tokens JWT

- Los tokens incluyen: `userId`, `email`, `rol`
- Expiración configurable (por defecto 24 horas)
- Validación en todas las rutas protegidas

### Validaciones

- Email único en la base de datos
- Contraseña mínimo 6 caracteres
- Validación de formato de email
- Mensajes de error genéricos para no revelar información

---

## 📊 Base de Datos

### Tabla: usuarios

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Hash bcrypt
    nombre VARCHAR(255) NOT NULL,
    rol ENUM('user', 'admin') DEFAULT 'user',
    INDEX idx_email (email),
    INDEX idx_rol (rol)
);
```

### Migración

Ejecutar el script de migración:
```bash
mysql -u root -p logistica_db < backend/src/infrastructure/database/migrations/002_create_usuarios_table.sql
```

---

## 🎨 Frontend

### Componente Login Actualizado

El componente `Login.jsx` ahora incluye:
- ✅ Formulario de registro
- ✅ Formulario de login
- ✅ Validación de campos
- ✅ Manejo de errores
- ✅ Tabs para alternar entre registro y login

### Servicio Actualizado

El servicio `authService.js` ahora incluye:
- ✅ `register(usuarioData)` - Registrar nuevo usuario
- ✅ `login(email, password)` - Login con credenciales
- ✅ `loginLegacy()` - Login sin credenciales (deprecado)

---

## 📝 Ejemplos de Uso

### JavaScript (Fetch)

```javascript
// Registrar usuario
const registerResponse = await fetch('http://localhost:3000/api/usuarios/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: 'password123',
    nombre: 'Juan Pérez'
  })
});
const registerData = await registerResponse.json();

// Login
const loginResponse = await fetch('http://localhost:3000/api/usuarios/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: 'password123'
  })
});
const loginData = await loginResponse.json();
const token = loginData.token;

// Usar token en peticiones
const clientesResponse = await fetch('http://localhost:3000/api/clientes', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### cURL

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/usuarios/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123",
    "nombre": "Juan Pérez"
  }'

# Login
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

---

## ✅ Características Implementadas

- ✅ Registro de usuarios con validación
- ✅ Login con email y contraseña
- ✅ Hash de contraseñas con bcrypt
- ✅ Tokens JWT con información del usuario
- ✅ Validación de credenciales
- ✅ Manejo seguro de errores
- ✅ Frontend actualizado con formularios
- ✅ Migración de base de datos
- ✅ Compatibilidad hacia atrás (endpoint legacy)

---

## 🔄 Migración desde el Sistema Anterior

Si ya estabas usando el endpoint `/api/auth/login`:

1. **Opción 1**: Registrar usuarios nuevos y usar `/api/usuarios/login`
2. **Opción 2**: Seguir usando `/api/auth/login` (deprecado pero funcional)

---

## 📚 Documentación Relacionada

- Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para documentación completa
- Ver [README.md](./README.md) para información general del proyecto
