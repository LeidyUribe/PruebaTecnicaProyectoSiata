# Guía de Instalación Rápida

## ⚡ Inicio Rápido

### 1. Configurar Base de Datos MySQL

```sql
-- Conectarse a MySQL
mysql -u root -p

-- Crear base de datos
CREATE DATABASE logistica_db;

-- Salir de MySQL
exit;
```

### 2. Ejecutar Migraciones

```bash
# Opción 1: Desde MySQL CLI
mysql -u root -p logistica_db < backend/src/infrastructure/database/migrations/001_create_tables.sql

# Opción 2: Copiar y pegar el contenido del archivo SQL en tu cliente MySQL
```

### 3. Configurar Backend

```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
# DB_PASSWORD=tu_password_mysql
# JWT_SECRET=una_clave_secreta_muy_larga_y_segura
```

### 4. Configurar Frontend

```bash
cd frontend
npm install
```

### 5. Ejecutar Aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 🔑 Primeros Pasos

1. Abrir http://localhost:5173
2. Hacer clic en "Iniciar Sesión" para obtener un token
3. Navegar por las secciones del menú
4. Crear un Cliente
5. Crear un Producto
6. Crear una Bodega o Puerto
7. Crear un Envío Terrestre o Marítimo

## 🧪 Ejecutar Pruebas

```bash
cd backend
npm test
```

## ⚠️ Solución de Problemas

### Error de conexión a MySQL
- Verificar que MySQL esté corriendo
- Verificar credenciales en `.env`
- Verificar que la base de datos `logistica_db` exista

### Error de puerto ocupado
- Cambiar `PORT` en `.env` del backend
- Cambiar puerto en `vite.config.js` del frontend

### Error de token inválido
- Hacer login nuevamente
- Verificar que `JWT_SECRET` esté configurado

## 📝 Notas

- El token JWT expira en 24 horas (configurable en `.env`)
- Para desarrollo, el endpoint `/api/auth/login` genera tokens sin validar credenciales
- En producción, implementar autenticación real con usuarios y contraseñas
