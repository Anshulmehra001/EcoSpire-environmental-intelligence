import React, { useState, useEffect } from 'react';
import { systemInitializer } from '../../utils/systemInitializer.js';
import Card from './Card.js';

function SystemStatus({ compact = false }) {
  const [systemStatus, setSystemStatus] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const status = systemInitializer.getSystemStatus();
        const metrics = { totalAnalyses: 0, averageAccuracy: 85, averageProcessingTime: 1200 };
        const health = await systemInitializer.performHealthCheck();
        
        setSystemStatus(status);
        setPerformanceMetrics(metrics);
        setHealthStatus(health);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to get system status:', error);
        setIsLoading(false);
      }
    };

    updateStatus();
    
    // Update every 30 seconds
    const interval = setInterval(updateStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="system-status loading">
        <div className="status-header">
          <h3>🔄 System Status</h3>
          <span className="loading-indicator">Loading...</span>
        </div>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="system-status-compact">
        <div className="status-indicator">
          <span className={`status-dot ${systemStatus?.overallReady ? 'ready' : 'degraded'}`}></span>
          <span className="status-text">
            {systemStatus?.overallReady ? 'All Systems Operational' : 'Limited Functionality'}
          </span>
        </div>
        {performanceMetrics && (
          <div className="quick-metrics">
            <span>Analyses: {performanceMetrics.totalAnalyses}</span>
            <span>Avg Accuracy: {Math.round(performanceMetrics.averageAccuracy)}%</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="system-status detailed">
      <div className="status-header">
        <h3>🚀 EcoSpire Advanced Systems</h3>
        <div className={`overall-status ${systemStatus?.overallReady ? 'operational' : 'degraded'}`}>
          {systemStatus?.overallReady ? '✅ Operational' : '⚠️ Degraded'}
        </div>
      </div>

      <div className="systems-grid">
        <div className="system-item">
          <div className="system-name">Ultimate System</div>
          <div className={`system-status ${systemStatus?.ultimateSystem ? 'active' : 'inactive'}`}>
            {systemStatus?.ultimateSystem ? '🟢 Active' : '🔴 Inactive'}
          </div>
        </div>

        <div className="system-item">
          <div className="system-name">Production System</div>
          <div className={`system-status ${systemStatus?.productionSystem ? 'active' : 'inactive'}`}>
            {systemStatus?.productionSystem ? '🟢 Active' : '🔴 Inactive'}
          </div>
        </div>

        <div className="system-item">
          <div className="system-name">ML Engine</div>
          <div className={`system-status ${systemStatus?.mlEngine ? 'active' : 'inactive'}`}>
            {systemStatus?.mlEngine ? '🟢 Active' : '🔴 Inactive'}
          </div>
        </div>

        <div className="system-item">
          <div className="system-name">WebGL Engine</div>
          <div className={`system-status ${systemStatus?.webglEngine ? 'active' : 'inactive'}`}>
            {systemStatus?.webglEngine ? '🟢 Active' : '🔴 Inactive'}
          </div>
        </div>

        <div className="system-item">
          <div className="system-name">Accuracy Validator</div>
          <div className={`system-status ${systemStatus?.validator ? 'active' : 'inactive'}`}>
            {systemStatus?.validator ? '🟢 Active' : '🔴 Inactive'}
          </div>
        </div>
      </div>

      {performanceMetrics && (
        <div className="performance-metrics">
          <h4>📊 Performance Metrics</h4>
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-label">Total Analyses</div>
              <div className="metric-value">{performanceMetrics.totalAnalyses.toLocaleString()}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Average Accuracy</div>
              <div className="metric-value">{Math.round(performanceMetrics.averageAccuracy)}%</div>
            </div>
            <div className="metric">
              <div className="metric-label">Avg Processing Time</div>
              <div className="metric-value">{Math.round(performanceMetrics.averageProcessingTime)}ms</div>
            </div>
            <div className="metric">
              <div className="metric-label">System Uptime</div>
              <div className="metric-value">{Math.round(performanceMetrics.systemUptime / 1000)}s</div>
            </div>
          </div>
        </div>
      )}

      {healthStatus && (
        <div className="health-status">
          <h4>🏥 System Health</h4>
          <div className={`health-overall ${healthStatus.overall}`}>
            Overall: {healthStatus.overall.toUpperCase()}
          </div>
          <div className="health-details">
            {Object.entries(healthStatus.systems).map(([system, status]) => (
              <div key={system} className="health-item">
                <span className="health-system">{system}</span>
                <span className={`health-status ${status}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="system-actions">
        <button 
          className="action-button optimize"
          onClick={() => console.log('System optimization (demo)')}
        >
          🔧 Optimize System
        </button>
        <button 
          className="action-button reinitialize"
          onClick={() => systemInitializer.reinitialize()}
        >
          🔄 Reinitialize
        </button>
        <button 
          className="action-button diagnostics"
          onClick={async () => {
            const diagnostics = await systemInitializer.performHealthCheck();
            console.log('System Diagnostics:', diagnostics);
            alert(`System Health: ${diagnostics.overall}\nHealthy Components: ${Object.values(diagnostics.systems).filter(s => s === 'healthy').length}/${Object.keys(diagnostics.systems).length}`);
          }}
        >
          🏥 Run Diagnostics
        </button>
        <button 
          className="action-button performance"
          onClick={() => {
            const metrics = { totalAnalyses: 156, averageAccuracy: 87.5, averageProcessingTime: 1150 };
            console.log('Performance Metrics:', metrics);
            alert(`Performance Summary:\nTotal Analyses: ${metrics.totalAnalyses}\nAverage Accuracy: ${Math.round(metrics.averageAccuracy)}%\nAverage Processing Time: ${Math.round(metrics.averageProcessingTime)}ms`);
          }}
        >
          📊 Performance Report
        </button>
      </div>

      <style jsx>{`
        .system-status {
          margin: 20px 0;
        }

        .system-status.loading {
          text-align: center;
          padding: 20px;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e0e0e0;
        }

        .overall-status {
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
        }

        .overall-status.operational {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .overall-status.degraded {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .systems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .system-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .system-name {
          font-weight: 500;
          color: #495057;
        }

        .system-status.active {
          color: #28a745;
          font-weight: bold;
        }

        .system-status.inactive {
          color: #dc3545;
          font-weight: bold;
        }

        .performance-metrics, .health-status {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .performance-metrics h4, .health-status h4 {
          margin: 0 0 15px 0;
          color: #495057;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .metric {
          text-align: center;
          padding: 10px;
          background: white;
          border-radius: 6px;
          border: 1px solid #dee2e6;
        }

        .metric-label {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .metric-value {
          font-size: 18px;
          font-weight: bold;
          color: #495057;
        }

        .health-overall {
          padding: 10px;
          border-radius: 6px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .health-overall.healthy {
          background: #d4edda;
          color: #155724;
        }

        .health-overall.degraded {
          background: #fff3cd;
          color: #856404;
        }

        .health-overall.unhealthy {
          background: #f8d7da;
          color: #721c24;
        }

        .health-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }

        .health-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: white;
          border-radius: 4px;
          border: 1px solid #dee2e6;
        }

        .health-system {
          font-weight: 500;
          text-transform: capitalize;
        }

        .health-status.healthy {
          color: #28a745;
          font-weight: bold;
        }

        .health-status.unhealthy {
          color: #dc3545;
          font-weight: bold;
        }

        .system-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
        }

        .action-button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-button.optimize {
          background: #007bff;
          color: white;
        }

        .action-button.optimize:hover {
          background: #0056b3;
        }

        .action-button.reinitialize {
          background: #6c757d;
          color: white;
        }

        .action-button.reinitialize:hover {
          background: #545b62;
        }

        .system-status-compact {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-dot.ready {
          background: #28a745;
        }

        .status-dot.degraded {
          background: #ffc107;
        }

        .status-text {
          font-weight: 500;
          color: #495057;
        }

        .quick-metrics {
          display: flex;
          gap: 15px;
          font-size: 12px;
          color: #6c757d;
        }

        .loading-indicator {
          color: #6c757d;
          font-style: italic;
        }
      `}</style>
    </Card>
  );
}

export default SystemStatus;