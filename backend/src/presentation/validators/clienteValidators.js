/**
 * Validadores para Cliente usando express-validator
 */
import { body } from 'express-validator';

export const createClienteValidator = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email debe tener un formato válido')
    .normalizeEmail(),

  body('telefono')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('El teléfono no puede exceder 50 caracteres'),

  body('direccion')
    .optional()
    .trim()
];
