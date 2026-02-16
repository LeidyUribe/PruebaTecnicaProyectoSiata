import mysqlConnection from '../database/MySQLConnection.js';
import { Producto } from '../../domain/entities/Producto.js';

export class MySQLProductoRepository {
  constructor() {
    this.pool = mysqlConnection.getPool();
  }

  async create(producto) {
    const [result] = await this.pool.execute(
      `INSERT INTO productos (tipo, descripcion)
       VALUES (?, ?)`,
      [
        producto.tipo,
        producto.descripcion || null
      ]
    );

    return await this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findAll() {
    const [rows] = await this.pool.execute('SELECT * FROM productos ORDER BY id DESC');
    return rows.map(row => this.mapToEntity(row));
  }

  async update(id, producto) {
    await this.pool.execute(
      `UPDATE productos 
       SET tipo = ?, descripcion = ?
       WHERE id = ?`,
      [
        producto.tipo,
        producto.descripcion || null,
        id
      ]
    );

    return await this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  mapToEntity(row) {
    return new Producto({
      id: row.id,
      tipo: row.tipo,
      descripcion: row.descripcion
    });
  }
}
