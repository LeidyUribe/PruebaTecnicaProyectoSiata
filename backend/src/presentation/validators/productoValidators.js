/**
 * Validadores para Producto
 */
import { body } from 'express-validator';

export const createProductoValidator = [
  body('tipo')
    .trim()
    .notEmpty()
    .withMessage('El tipo de producto es requerido')
    .isLength({ min: 1, max: 255 })
    .withMessage('El tipo debe tener entre 1 y 255 caracteres'),

  body('descripcion')
    .optional()
    .trim()
];
