/**
 * Implementación del Repositorio de Bodega con MySQL
 */
import mysqlConnection from '../database/MySQLConnection.js';
import { Bodega } from '../../domain/entities/Bodega.js';

export class MySQLBodegaRepository {
  constructor() {
    this.pool = mysqlConnection.getPool();
  }

  async create(bodega) {
    const [result] = await this.pool.execute(
      `INSERT INTO bodegas (nombre, direccion, ciudad, fecha_creacion)
       VALUES (?, ?, ?, ?)`,
      [
        bodega.nombre,
        bodega.direccion,
        bodega.ciudad || null,
        bodega.fechaCreacion
      ]
    );

    return await this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM bodegas WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findAll() {
    const [rows] = await this.pool.execute('SELECT * FROM bodegas ORDER BY fecha_creacion DESC');
    return rows.map(row => this.mapToEntity(row));
  }

  async update(id, bodega) {
    await this.pool.execute(
      `UPDATE bodegas 
       SET nombre = ?, direccion = ?, ciudad = ?
       WHERE id = ?`,
      [
        bodega.nombre,
        bodega.direccion,
        bodega.ciudad || null,
        id
      ]
    );

    return await this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute('DELETE FROM bodegas WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  mapToEntity(row) {
    return new Bodega({
      id: row.id,
      nombre: row.nombre,
      direccion: row.direccion,
      ciudad: row.ciudad,
      fechaCreacion: row.fecha_creacion
    });
  }
}
