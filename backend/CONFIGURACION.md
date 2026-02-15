# 🔧 Guía de Configuración

## ⚠️ Error: "secretOrPrivateKey must have a value"

Si estás viendo este error, significa que el archivo `.env` no está configurado correctamente o no existe.

## 📝 Pasos para Solucionar

### 1. Crear archivo `.env` en la carpeta `backend/`

```bash
cd backend
```

### 2. Crear el archivo `.env` con el siguiente contenido:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=logistica_db

# JWT Configuration
# ⚠️ IMPORTANTE: Cambia este valor por una clave secreta segura
JWT_SECRET=mi_clave_secreta_super_segura_minimo_32_caracteres_123456789
JWT_EXPIRES_IN=24h
```

### 3. Reemplazar los valores:

- **DB_PASSWORD**: Tu contraseña de MySQL
- **JWT_SECRET**: Una clave secreta larga y segura (mínimo 32 caracteres recomendado)
  - Puedes generar una con: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 4. Reiniciar el servidor

```bash
# Detener el servidor (Ctrl+C)
# Luego iniciar nuevamente
npm run dev
```

## ✅ Verificación

Una vez configurado correctamente, el servidor debería iniciar sin errores y el endpoint `/api/auth/login` debería funcionar correctamente.

## 🔍 Verificar que el archivo existe

En Windows PowerShell:
```powershell
Test-Path backend\.env
```

En Linux/Mac:
```bash
ls -la backend/.env
```

## 📌 Nota

El archivo `.env` está en `.gitignore` por seguridad, por lo que no se subirá al repositorio. Cada desarrollador debe crear su propio archivo `.env` basado en `env.example.txt`.
