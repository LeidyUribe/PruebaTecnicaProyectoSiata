import mysqlConnection from '../database/MySQLConnection.js';
import { EnvioTerrestre } from '../../domain/entities/EnvioTerrestre.js';

export class MySQLEnvioTerrestreRepository {
  constructor() {
    this.pool = mysqlConnection.getPool();
  }

  async create(envio) {
    const [result] = await this.pool.execute(
      `INSERT INTO envios_terrestres 
       (cliente_id, producto_id, cantidad, fecha_registro, fecha_entrega, 
        bodega_id, precio_envio, placa_vehiculo, numero_guia, descuento, precio_final)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        envio.clienteId,
        envio.productoId,
        envio.cantidad,
        envio.fechaRegistro,
        envio.fechaEntrega,
        envio.bodegaId,
        envio.precioEnvio,
        envio.placaVehiculo.toUpperCase(),
        envio.numeroGuia.toUpperCase(),
        envio.descuento,
        envio.precioFinal
      ]
    );

    return await this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM envios_terrestres WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async findAll() {
    const [rows] = await this.pool.execute(
      'SELECT * FROM envios_terrestres ORDER BY id DESC'
    );
    return rows.map(row => this.mapToEntity(row));
  }

  async findByClienteId(clienteId) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM envios_terrestres WHERE cliente_id = ? ORDER BY id DESC',
      [clienteId]
    );
    return rows.map(row => this.mapToEntity(row));
  }

  async findWithFilters(filters) {
    let query = 'SELECT * FROM envios_terrestres WHERE 1=1';
    const params = [];

    if (filters.clienteId) {
      query += ' AND cliente_id = ?';
      params.push(filters.clienteId);
    }
    if (filters.numeroGuia) {
      query += ' AND numero_guia = ?';
      params.push(filters.numeroGuia.toUpperCase());
    }
    if (filters.bodegaId) {
      query += ' AND bodega_id = ?';
      params.push(filters.bodegaId);
    }
    if (filters.fechaRegistroDesde) {
      query += ' AND fecha_registro >= ?';
      params.push(filters.fechaRegistroDesde);
    }
    if (filters.fechaRegistroHasta) {
      query += ' AND fecha_registro <= ?';
      params.push(filters.fechaRegistroHasta);
    }
    if (filters.fechaEntregaDesde) {
      query += ' AND fecha_entrega >= ?';
      params.push(filters.fechaEntregaDesde);
    }
    if (filters.fechaEntregaHasta) {
      query += ' AND fecha_entrega <= ?';
      params.push(filters.fechaEntregaHasta);
    }

    query += ' ORDER BY id DESC';
    const [rows] = await this.pool.execute(query, params);
    return rows.map(row => this.mapToEntity(row));
  }

  async findByNumeroGuia(numeroGuia) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM envios_terrestres WHERE numero_guia = ?',
      [numeroGuia.toUpperCase()]
    );

    if (rows.length === 0) return null;

    return this.mapToEntity(rows[0]);
  }

  async update(id, envio) {
    await this.pool.execute(
      `UPDATE envios_terrestres 
       SET cliente_id = ?, producto_id = ?, cantidad = ?, fecha_registro = ?, 
           fecha_entrega = ?, bodega_id = ?, precio_envio = ?, placa_vehiculo = ?, 
           numero_guia = ?, descuento = ?, precio_final = ?
       WHERE id = ?`,
      [
        envio.clienteId,
        envio.productoId,
        envio.cantidad,
        envio.fechaRegistro,
        envio.fechaEntrega,
        envio.bodegaId,
        envio.precioEnvio,
        envio.placaVehiculo.toUpperCase(),
        envio.numeroGuia.toUpperCase(),
        envio.descuento,
        envio.precioFinal,
        id
      ]
    );

    return await this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute('DELETE FROM envios_terrestres WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  mapToEntity(row) {
    return new EnvioTerrestre({
      id: row.id,
      clienteId: row.cliente_id,
      productoId: row.producto_id,
      cantidad: row.cantidad,
      fechaRegistro: row.fecha_registro,
      fechaEntrega: row.fecha_entrega,
      bodegaId: row.bodega_id,
      precioEnvio: parseFloat(row.precio_envio),
      placaVehiculo: row.placa_vehiculo,
      numeroGuia: row.numero_guia,
      descuento: parseFloat(row.descuento),
      precioFinal: parseFloat(row.precio_final)
    });
  }
}
