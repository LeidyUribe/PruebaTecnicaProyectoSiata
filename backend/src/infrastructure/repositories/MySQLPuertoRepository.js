/**
 * Implementación del Repositorio de Puerto con MySQL
 */
import mysqlConnection from '../database/MySQLConnection.js';
import { Puerto } from '../../domain/entities/Puerto.js';

export class MySQLPuertoRepository {
  constructor() {
    this.pool = mysqlConnection.getPool();
  }

  async create(puerto) {
    const [result] = await this.pool.execute(
      `INSERT INTO puertos (nombre, ubicacion, pais, fecha_creacion)
       VALUES (?, ?, ?, ?)`,
      [
        puerto.nombre,
        puerto.ubicacion,
        puerto.pais || null,
        puerto.fechaCreacion
      ]
    );

    return await this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM puertos WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findAll() {
    const [rows] = await this.pool.execute('SELECT * FROM puertos ORDER BY fecha_creacion DESC');
    return rows.map(row => this.mapToEntity(row));
  }

  async update(id, puerto) {
    await this.pool.execute(
      `UPDATE puertos 
       SET nombre = ?, ubicacion = ?, pais = ?
       WHERE id = ?`,
      [
        puerto.nombre,
        puerto.ubicacion,
        puerto.pais || null,
        id
      ]
    );

    return await this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute('DELETE FROM puertos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  mapToEntity(row) {
    return new Puerto({
      id: row.id,
      nombre: row.nombre,
      ubicacion: row.ubicacion,
      pais: row.pais,
      fechaCreacion: row.fecha_creacion
    });
  }
}
