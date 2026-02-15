/**
 * Middleware de Manejo de Errores
 * Centraliza el manejo de errores en la aplicación
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores de validación
  if (err.name === 'ValidationError' || err.message.includes('inválid')) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Error de validación',
      errors: err.errors || []
    });
  }

  // Errores de recurso no encontrado
  if (err.message.includes('no encontrado') || err.message.includes('not found')) {
    return res.status(404).json({
      success: false,
      message: err.message
    });
  }

  // Errores de duplicado
  if (err.message.includes('ya existe') || err.message.includes('ya está')) {
    return res.status(409).json({
      success: false,
      message: err.message
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
};
