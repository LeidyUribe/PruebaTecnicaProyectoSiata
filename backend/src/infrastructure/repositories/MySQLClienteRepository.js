import mysqlConnection from '../database/MySQLConnection.js';
import { Cliente } from '../../domain/entities/Cliente.js';

export class MySQLClienteRepository {
  constructor() {
    this.pool = mysqlConnection.getPool();
  }

  async create(cliente) {
    const [result] = await this.pool.execute(
      `INSERT INTO clientes (nombre, email, telefono, direccion)
       VALUES (?, ?, ?, ?)`,
      [
        cliente.nombre,
        cliente.email,
        cliente.telefono || null,
        cliente.direccion || null
      ]
    );

    return await this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM clientes WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findAll() {
    const [rows] = await this.pool.execute('SELECT * FROM clientes ORDER BY id DESC');
    return rows.map(row => this.mapToEntity(row));
  }

  async update(id, cliente) {
    await this.pool.execute(
      `UPDATE clientes 
       SET nombre = ?, email = ?, telefono = ?, direccion = ?
       WHERE id = ?`,
      [
        cliente.nombre,
        cliente.email,
        cliente.telefono || null,
        cliente.direccion || null,
        id
      ]
    );

    return await this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute('DELETE FROM clientes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  async findByEmail(email) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM clientes WHERE email = ?',
      [email]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  mapToEntity(row) {
    return new Cliente({
      id: row.id,
      nombre: row.nombre,
      email: row.email,
      telefono: row.telefono,
      direccion: row.direccion
    });
  }
}
