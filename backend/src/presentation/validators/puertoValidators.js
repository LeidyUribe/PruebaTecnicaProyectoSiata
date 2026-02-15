/**
 * Validadores para Puerto
 */
import { body } from 'express-validator';

export const createPuertoValidator = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre del puerto es requerido')
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre debe tener entre 1 y 255 caracteres'),

  body('ubicacion')
    .trim()
    .notEmpty()
    .withMessage('La ubicación es requerida'),

  body('pais')
    .optional()
    .trim()
];
