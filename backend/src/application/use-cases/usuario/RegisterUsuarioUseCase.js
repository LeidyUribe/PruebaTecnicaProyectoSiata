import bcrypt from 'bcryptjs';

export class RegisterUsuarioUseCase {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(usuarioData) {
    const existingUsuario = await this.usuarioRepository.findByEmail(usuarioData.email);
    if (existingUsuario) {
      throw new Error('El email ya está registrado');
    }

    if (!usuarioData.password || usuarioData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    let rol = 'user';
    if (usuarioData.rol && (usuarioData.rol === 'user' || usuarioData.rol === 'admin')) {
      rol = usuarioData.rol;
    }

    const Usuario = (await import('../../../domain/entities/Usuario.js')).Usuario;
    const usuario = new Usuario({
      email: usuarioData.email,
      password: usuarioData.password,
      nombre: usuarioData.nombre,
      rol: rol
    });

    if (!usuario.isValid()) {
      throw new Error('Datos del usuario inválidos');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuarioData.password, saltRounds);
    usuario.password = hashedPassword;

    const usuarioCreado = await this.usuarioRepository.create(usuario);
    delete usuarioCreado.password;
    
    return usuarioCreado;
  }
}
