/**
 * Validadores para Bodega
 */
import { body } from 'express-validator';

export const createBodegaValidator = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre de la bodega es requerido')
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre debe tener entre 1 y 255 caracteres'),

  body('direccion')
    .trim()
    .notEmpty()
    .withMessage('La dirección es requerida'),

  body('ciudad')
    .optional()
    .trim()
];
