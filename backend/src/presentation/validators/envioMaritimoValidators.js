/**
 * Validadores para Envío Marítimo
 */
import { body } from 'express-validator';

export const createEnvioMaritimoValidator = [
  body('clienteId')
    .notEmpty()
    .withMessage('El ID del cliente es requerido')
    .isInt({ min: 1 })
    .withMessage('El ID del cliente debe ser un número entero válido'),

  body('productoId')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isInt({ min: 1 })
    .withMessage('El ID del producto debe ser un número entero válido'),

  body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),

  body('fechaRegistro')
    .notEmpty()
    .withMessage('La fecha de registro es requerida')
    .isISO8601()
    .withMessage('La fecha de registro debe tener formato ISO8601 (YYYY-MM-DD)')
    .toDate(),

  body('fechaEntrega')
    .notEmpty()
    .withMessage('La fecha de entrega es requerida')
    .isISO8601()
    .withMessage('La fecha de entrega debe tener formato ISO8601 (YYYY-MM-DD)')
    .toDate()
    .custom((value, { req }) => {
      if (req.body.fechaRegistro && new Date(value) < new Date(req.body.fechaRegistro)) {
        throw new Error('La fecha de entrega debe ser posterior o igual a la fecha de registro');
      }
      return true;
    }),

  body('puertoId')
    .notEmpty()
    .withMessage('El ID del puerto es requerido')
    .isInt({ min: 1 })
    .withMessage('El ID del puerto debe ser un número entero válido'),

  body('precioEnvio')
    .notEmpty()
    .withMessage('El precio de envío es requerido')
    .isFloat({ min: 0.01 })
    .withMessage('El precio de envío debe ser un número mayor a 0'),

  body('numeroFlota')
    .trim()
    .notEmpty()
    .withMessage('El número de flota es requerido')
    .matches(/^[A-Z]{3}[0-9]{4}[A-Z]{1}$/i)
    .withMessage('El número de flota debe tener formato: 3 letras + 4 números + 1 letra (ej: ABC1234D)'),

  body('numeroGuia')
    .trim()
    .notEmpty()
    .withMessage('El número de guía es requerido')
    .isLength({ min: 10, max: 10 })
    .withMessage('El número de guía debe tener exactamente 10 caracteres')
    .matches(/^[A-Z0-9]{10}$/i)
    .withMessage('El número de guía debe contener solo letras y números')
];
