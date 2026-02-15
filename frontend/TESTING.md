# 🧪 Guía de Pruebas Unitarias - Frontend

## 📍 Ubicación de las Pruebas

Las pruebas unitarias están ubicadas en:
```
frontend/src/
├── services/__tests__/     # Pruebas de servicios
└── components/__tests__/    # Pruebas de componentes
```

## 🚀 Ejecutar Pruebas

### Instalar dependencias (si aún no lo has hecho)
```bash
cd frontend
npm install
```

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch (desarrollo)
```bash
npm test
# Vitest se ejecuta en modo watch por defecto
```

### Ejecutar pruebas con UI interactiva
```bash
npm run test:ui
```

### Ejecutar pruebas con cobertura
```bash
npm run test:coverage
```

## 📋 Pruebas Implementadas

### ✅ Servicios con Pruebas

1. **authService.test.js** - Pruebas del servicio de autenticación
   - Login exitoso
   - Manejo de errores
   - Errores de red

2. **clienteService.test.js** - Pruebas del servicio de clientes
   - Obtener todos los clientes
   - Obtener cliente por ID
   - Crear cliente

### ✅ Componentes con Pruebas

1. **ClienteForm.test.jsx** - Pruebas del formulario de cliente
   - Renderizado de campos
   - Entrada de datos
   - Validación de campos requeridos
   - Envío del formulario
   - Cancelación

2. **Navbar.test.jsx** - Pruebas del componente de navegación
   - Renderizado de enlaces
   - Funcionalidad de logout
   - Navegación

## 🎯 Cobertura Actual

### Servicios
- ✅ authService: Login y manejo de errores
- ✅ clienteService: CRUD básico

### Componentes
- ✅ ClienteForm: Formulario completo
- ✅ Navbar: Navegación y logout

## 📝 Estructura de las Pruebas

### Pruebas de Servicios
```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { servicio } from '../servicio';
import api from '../api';

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe('servicio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe hacer algo específico', async () => {
    // Arrange
    api.get.mockResolvedValue({ data: {} });
    
    // Act
    const result = await servicio.metodo();
    
    // Assert
    expect(result).toEqual({});
  });
});
```

### Pruebas de Componentes
```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Componente from '../Componente';

describe('Componente', () => {
  it('debe renderizar correctamente', () => {
    render(<Componente />);
    expect(screen.getByText('Texto')).toBeInTheDocument();
  });

  it('debe manejar interacciones del usuario', async () => {
    const user = userEvent.setup();
    render(<Componente />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Assertions
  });
});
```

## 🔧 Configuración

### Vitest
- Configurado en `vitest.config.js`
- Entorno: `jsdom` (para simular DOM)
- Setup: `src/test/setup.js`
- Cobertura: V8

### React Testing Library
- Utilidades para renderizar componentes
- Queries para encontrar elementos
- Simulación de eventos de usuario

## 📊 Reportes de Cobertura

Después de ejecutar `npm run test:coverage`, los reportes se generan en:
```
frontend/coverage/
```

Abre `coverage/index.html` en tu navegador para ver el reporte visual.

## 🚧 Pruebas Futuras (Opcional)

Para mejorar la cobertura, se pueden agregar:
- Pruebas de todos los servicios restantes
- Pruebas de todos los componentes de formulario
- Pruebas de páginas completas
- Pruebas de integración
- Pruebas E2E (con Playwright o Cypress)

## ⚠️ Notas

- Las pruebas usan mocks para las llamadas a la API
- `localStorage` está mockeado globalmente
- Los componentes que usan React Router necesitan `BrowserRouter` wrapper

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Error: "jsdom not found"
```bash
npm install --save-dev jsdom
```

### Las pruebas no detectan cambios
```bash
# Reiniciar Vitest
# Presiona 'q' para salir y vuelve a ejecutar npm test
```
