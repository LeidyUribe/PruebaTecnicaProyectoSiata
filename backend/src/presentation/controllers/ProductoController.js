/**
 * Controlador de Producto
 */
import { validationResult } from 'express-validator';

export class ProductoController {
  constructor(createProductoUseCase, getAllProductosUseCase) {
    this.createProductoUseCase = createProductoUseCase;
    this.getAllProductosUseCase = getAllProductosUseCase;
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array()
        });
      }

      const producto = await this.createProductoUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: producto
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const productos = await this.getAllProductosUseCase.execute();

      res.json({
        success: true,
        count: productos.length,
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }
}
