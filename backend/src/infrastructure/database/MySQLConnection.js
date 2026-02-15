/**
 * Configuración de conexión a MySQL
 * Implementa el patrón Singleton para una única instancia de conexión
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class MySQLConnection {
  constructor() {
    this.pool = null;
  }

  /**
   * Crea el pool de conexiones
   */
  createPool() {
    if (!this.pool) {
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'logistica_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }
    return this.pool;
  }

  /**
   * Obtiene el pool de conexiones
   */
  getPool() {
    if (!this.pool) {
      return this.createPool();
    }
    return this.pool;
  }

  /**
   * Cierra todas las conexiones
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

export default new MySQLConnection();
