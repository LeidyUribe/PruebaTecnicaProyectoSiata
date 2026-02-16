-- Script para corregir la columna password en la tabla usuarios
-- Asegura que tenga suficiente espacio para hashes bcrypt (60 caracteres)
-- Los hashes de bcrypt siempre tienen exactamente 60 caracteres

-- Si la tabla ya existe, alterar la columna
-- Esto asegura que la columna tenga suficiente espacio (VARCHAR(255) es más que suficiente)
ALTER TABLE usuarios 
MODIFY COLUMN password VARCHAR(255) NOT NULL 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
