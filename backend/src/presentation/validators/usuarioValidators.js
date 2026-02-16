/**
 * Validadores para Usuario usando express-validator
 */
import { body } from 'express-validator';

export const registerUsuarioValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email debe tener un formato válido')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),

  body('rol')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .custom((value) => {
      // Si viene vacío, null o undefined, se acepta (se usará 'user' por defecto)
      if (!value || value === '') {
        return true;
      }
      // Si tiene valor, debe ser 'user' o 'admin'
      if (value !== 'user' && value !== 'admin') {
        throw new Error('El rol debe ser "user" o "admin"');
      }
      return true;
    })
    .withMessage('El rol debe ser "user" o "admin"')
];

export const loginUsuarioValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email debe tener un formato válido')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es requerida')
];
