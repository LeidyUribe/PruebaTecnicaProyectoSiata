/**
 * Pruebas unitarias para ClienteForm
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClienteForm from '../ClienteForm';

describe('ClienteForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar todos los campos del formulario', () => {
    render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
  });

  it('debe permitir ingresar datos en los campos', async () => {
    const user = userEvent.setup();
    render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const nombreInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(nombreInput, 'Juan Pérez');
    await user.type(emailInput, 'juan@example.com');

    expect(nombreInput).toHaveValue('Juan Pérez');
    expect(emailInput).toHaveValue('juan@example.com');
  });

  it('debe llamar onSubmit con los datos correctos al enviar', async () => {
    const user = userEvent.setup();
    render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/teléfono/i), '1234567890');
    await user.type(screen.getByLabelText(/dirección/i), 'Calle 123');

    const submitButton = screen.getByRole('button', { name: /crear cliente/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '1234567890',
      direccion: 'Calle 123'
    });
  });

  it('debe validar que los campos requeridos estén llenos', async () => {
    const user = userEvent.setup();
    render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const submitButton = screen.getByRole('button', { name: /crear cliente/i });
    await user.click(submitButton);

    // El formulario HTML5 debe prevenir el envío
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('debe llamar onCancel cuando se hace clic en cancelar', async () => {
    const user = userEvent.setup();
    render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('debe limpiar los campos después de cancelar', async () => {
    const user = userEvent.setup();
    render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Test');
    await user.type(screen.getByLabelText(/email/i), 'test@test.com');

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelButton);

    // Los campos deben estar vacíos después de cancelar
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
  });
});
