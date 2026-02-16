import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class LoginUsuarioUseCase {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(credentials) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está configurado');
    }

    const token = jwt.sign(
      {
        userId: usuario.id,
        email: usuario.email,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      },
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    };
  }
}
