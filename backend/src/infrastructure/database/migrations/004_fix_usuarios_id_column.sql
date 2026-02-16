-- Script para corregir la columna id en la tabla usuarios
-- Asegura que tenga AUTO_INCREMENT correctamente configurado

-- Verificar y corregir la estructura de la tabla
-- Si la columna id no tiene AUTO_INCREMENT, se corrige
ALTER TABLE usuarios 
MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

-- Verificar que el AUTO_INCREMENT esté configurado
-- (Esto se ejecuta automáticamente con la línea anterior)
