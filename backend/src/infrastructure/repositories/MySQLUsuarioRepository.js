import mysqlConnection from '../database/MySQLConnection.js';
import { Usuario } from '../../domain/entities/Usuario.js';

export class MySQLUsuarioRepository {
  constructor() {
    this.pool = mysqlConnection.getPool();
  }

  async create(usuario) {
    const [result] = await this.pool.execute(
      `INSERT INTO usuarios (email, password, nombre, rol)
       VALUES (?, ?, ?, ?)`,
      [
        usuario.email,
        usuario.password,
        usuario.nombre,
        usuario.rol || 'user'
      ]
    );

    return await this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findByEmail(email) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findAll() {
    const [rows] = await this.pool.execute('SELECT id, email, nombre, rol FROM usuarios ORDER BY id DESC');
    return rows.map(row => this.mapToEntity(row, false));
  }

  async update(id, usuario) {
    const updates = [];
    const values = [];

    if (usuario.email) {
      updates.push('email = ?');
      values.push(usuario.email);
    }
    if (usuario.nombre) {
      updates.push('nombre = ?');
      values.push(usuario.nombre);
    }
    if (usuario.rol) {
      updates.push('rol = ?');
      values.push(usuario.rol);
    }
    if (usuario.password) {
      updates.push('password = ?');
      values.push(usuario.password);
    }

    if (updates.length === 0) {
      return await this.findById(id);
    }

    values.push(id);
    await this.pool.execute(
      `UPDATE usuarios SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return await this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  mapToEntity(row, includePassword = true) {
    const usuario = new Usuario({
      id: row.id,
      email: row.email,
      nombre: row.nombre,
      rol: row.rol
    });

    if (includePassword && row.password) {
      usuario.password = row.password;
    }

    return usuario;
  }
}
