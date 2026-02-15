# Sistema de Logística Terrestre y Marítima

Solución completa para gestión de logística terrestre y marítima desarrollada con **Clean Architecture**, **SOLID**, y **Clean Code**.

## 📋 Características

- ✅ Frontend en React con Vite
- ✅ Backend en Node.js con Express
- ✅ Base de datos MySQL
- ✅ Clean Architecture con separación de capas
- ✅ Principios SOLID aplicados
- ✅ Validaciones robustas
- ✅ Autenticación con Bearer Token (JWT)
- ✅ Pruebas unitarias
- ✅ Documentación técnica completa

## 🏗️ Arquitectura

El proyecto sigue **Clean Architecture** con las siguientes capas:

```
backend/
├── src/
│   ├── domain/              # Capa de Dominio (Entidades y Repositorios)
│   │   ├── entities/        # Entidades de negocio
│   │   └── repositories/    # Interfaces de repositorios
│   ├── application/         # Capa de Aplicación (Casos de Uso)
│   │   └── use-cases/       # Lógica de negocio
│   ├── infrastructure/      # Capa de Infraestructura
│   │   ├── database/        # Conexión MySQL
│   │   ├── repositories/    # Implementaciones MySQL
│   │   └── middleware/      # Middlewares (auth, errors)
│   └── presentation/        # Capa de Presentación
│       ├── controllers/     # Controladores REST
│       ├── routes/          # Rutas Express
│       └── validators/      # Validadores express-validator
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js >= 18
- MySQL >= 8.0
- npm o yarn

### 1. Configurar Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE logistica_db;

-- Ejecutar migraciones
-- Ver archivo: backend/src/infrastructure/database/migrations/create_tables.sql
```

### 2. Configurar Backend

```bash
cd backend
npm install

Configurar `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=logistica_db
JWT_SECRET=dc2a5130256f864e384fceab9ce372ae99e00b0bf02abe781fd11cc2fa418d86
JWT_EXPIRES_IN=24h
```

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

## 🏃 Ejecución

### Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📚 API Endpoints

Para documentación completa de la API, ver **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

### Resumen de Endpoints

- **Autenticación**: `POST /api/auth/login`
- **Clientes**: `GET /api/clientes`, `GET /api/clientes/:id`, `POST /api/clientes`
- **Productos**: `GET /api/productos`, `POST /api/productos`
- **Bodegas**: `GET /api/bodegas`, `POST /api/bodegas`
- **Puertos**: `GET /api/puertos`, `POST /api/puertos`
- **Envíos Terrestres**: `GET /api/envios-terrestres`, `POST /api/envios-terrestres`
- **Envíos Marítimos**: `GET /api/envios-maritimos`, `POST /api/envios-maritimos`

### Ejemplos de Uso

Ver **[API_EXAMPLES.md](./API_EXAMPLES.md)** para ejemplos en diferentes lenguajes (JavaScript, Python, cURL, Postman)

## 🔐 Autenticación

Todas las rutas (excepto `/api/auth/login`) requieren autenticación Bearer Token:

```
Authorization: Bearer <token>
```

Para obtener un token, hacer POST a `/api/auth/login`.

## 🧪 Pruebas

```bash
cd backend
npm test
```

## 📖 Documentación Técnica

Ver [DOCUMENTACION_TECNICA.md](./DOCUMENTACION_TECNICA.md) para detalles sobre:
- Decisiones de arquitectura
- Principios SOLID aplicados
- Patrones de diseño utilizados
- Validaciones implementadas

## 🎯 Reglas de Negocio Implementadas

### Envíos Terrestres
- ✅ Validación de placa (3 letras + 3 números)
- ✅ Validación de número de guía (10 caracteres alfanuméricos únicos)
- ✅ Descuento automático del 5% si cantidad > 10
- ✅ Validación de fechas (entrega >= registro)

### Envíos Marítimos
- ✅ Validación de número de flota (3 letras + 4 números + 1 letra)
- ✅ Validación de número de guía (10 caracteres alfanuméricos únicos)
- ✅ Descuento automático del 3% si cantidad > 10
- ✅ Validación de fechas (entrega >= registro)

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- express-validator
- Jest (testing)

### Frontend
- React 18
- React Router
- Axios
- Vite

## 📝 Estructura del Proyecto

```
ProyectoSiata/
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── README.md
```

## 👨‍💻 Autor

Desarrollado como prueba técnica aplicando Clean Architecture, SOLID y Clean Code.
