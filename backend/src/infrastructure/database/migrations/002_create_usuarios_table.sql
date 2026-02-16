-- Script de creación de tabla de usuarios
-- Aplicar después de 001_create_tables.sql

-- Tabla de Usuarios
-- Si la tabla ya existe, se elimina y se recrea para asegurar la estructura correcta
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    rol ENUM('user', 'admin') DEFAULT 'user',
    PRIMARY KEY (id),
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
