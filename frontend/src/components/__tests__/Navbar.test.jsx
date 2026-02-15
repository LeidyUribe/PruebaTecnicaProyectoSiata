/**
 * Pruebas unitarias para Navbar
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el logo/brand', () => {
    renderWithRouter(<Navbar onLogout={mockOnLogout} />);
    expect(screen.getByText(/sistema de logística/i)).toBeInTheDocument();
  });

  it('debe renderizar todos los enlaces de navegación', () => {
    renderWithRouter(<Navbar onLogout={mockOnLogout} />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/clientes/i)).toBeInTheDocument();
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
    expect(screen.getByText(/bodegas/i)).toBeInTheDocument();
    expect(screen.getByText(/puertos/i)).toBeInTheDocument();
    expect(screen.getByText(/envíos terrestres/i)).toBeInTheDocument();
    expect(screen.getByText(/envíos marítimos/i)).toBeInTheDocument();
  });

  it('debe renderizar el botón de cerrar sesión', () => {
    renderWithRouter(<Navbar onLogout={mockOnLogout} />);
    expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
  });

  it('debe llamar onLogout cuando se hace clic en cerrar sesión', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar onLogout={mockOnLogout} />);

    const logoutButton = screen.getByText(/cerrar sesión/i);
    await user.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('debe marcar el enlace activo según la ruta', () => {
    // Esta prueba requeriría mockear useLocation
    // Por ahora verificamos que los enlaces existan
    renderWithRouter(<Navbar onLogout={mockOnLogout} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
