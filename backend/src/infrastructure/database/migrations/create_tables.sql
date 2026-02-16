-- Script de creación de tablas para el sistema de logística
-- Aplicar principios de normalización y buenas prácticas

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(50),
    direccion TEXT,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    descripcion TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Bodegas
CREATE TABLE IF NOT EXISTS bodegas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion TEXT NOT NULL,
    ciudad VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Puertos
CREATE TABLE IF NOT EXISTS puertos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    pais VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Envíos Terrestres
CREATE TABLE IF NOT EXISTS envios_terrestres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    fecha_registro DATE NOT NULL,
    fecha_entrega DATE NOT NULL,
    bodega_id INT NOT NULL,
    precio_envio DECIMAL(10, 2) NOT NULL CHECK (precio_envio > 0),
    placa_vehiculo VARCHAR(6) NOT NULL,
    numero_guia VARCHAR(10) NOT NULL UNIQUE,
    descuento DECIMAL(5, 4) DEFAULT 0,
    precio_final DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT,
    FOREIGN KEY (bodega_id) REFERENCES bodegas(id) ON DELETE RESTRICT,
    INDEX idx_cliente (cliente_id),
    INDEX idx_numero_guia (numero_guia),
    INDEX idx_fecha_registro (fecha_registro),
    CONSTRAINT chk_fecha_entrega CHECK (fecha_entrega >= fecha_registro),
    CONSTRAINT chk_placa_vehiculo CHECK (placa_vehiculo REGEXP '^[A-Z]{3}[0-9]{3}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Envíos Marítimos
CREATE TABLE IF NOT EXISTS envios_maritimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    fecha_registro DATE NOT NULL,
    fecha_entrega DATE NOT NULL,
    puerto_id INT NOT NULL,
    precio_envio DECIMAL(10, 2) NOT NULL CHECK (precio_envio > 0),
    numero_flota VARCHAR(8) NOT NULL,
    numero_guia VARCHAR(10) NOT NULL UNIQUE,
    descuento DECIMAL(5, 4) DEFAULT 0,
    precio_final DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT,
    FOREIGN KEY (puerto_id) REFERENCES puertos(id) ON DELETE RESTRICT,
    INDEX idx_cliente (cliente_id),
    INDEX idx_numero_guia (numero_guia),
    INDEX idx_fecha_registro (fecha_registro),
    CONSTRAINT chk_fecha_entrega_mar CHECK (fecha_entrega >= fecha_registro),
    CONSTRAINT chk_numero_flota CHECK (numero_flota REGEXP '^[A-Z]{3}[0-9]{4}[A-Z]{1}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
