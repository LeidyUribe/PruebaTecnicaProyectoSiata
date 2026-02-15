import React, { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import { envioTerrestreService } from '../services/envioTerrestreService';
import { envioMaritimoService } from '../services/envioMaritimoService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    enviosTerrestres: 0,
    enviosMaritimos: 0,
    totalEnvios: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [clientesRes, terrestresRes, maritimosRes] = await Promise.all([
        clienteService.getAll(),
        envioTerrestreService.getAll(),
        envioMaritimoService.getAll()
      ]);

      setStats({
        clientes: clientesRes.count || 0,
        enviosTerrestres: terrestresRes.count || 0,
        enviosMaritimos: maritimosRes.count || 0,
        totalEnvios: (terrestresRes.count || 0) + (maritimosRes.count || 0)
      });
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Cargando...</div>;
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.clientes}</div>
          <div className="stat-label">Clientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-value">{stats.enviosTerrestres}</div>
          <div className="stat-label">Envíos Terrestres</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚢</div>
          <div className="stat-value">{stats.enviosMaritimos}</div>
          <div className="stat-label">Envíos Marítimos</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{stats.totalEnvios}</div>
          <div className="stat-label">Total Envíos</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
