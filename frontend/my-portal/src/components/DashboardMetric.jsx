import React from 'react';
import Card from './Card';

/**
 * ダッシュボードで利用する単一のメトリック（数値指標）を表示するコンポーネント
 */
const DashboardMetric = ({ icon, label, value, unit, color }) => {
  return (
    <Card className="metric-card" style={{ borderLeft: `5px solid ${color || 'var(--primary-color)'}`, transition: 'transform 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--text-color-light)', fontSize: '0.9em' }}>{label}</p>
          <h2 style={{ fontSize: '2.5em', margin: '5px 0', color: color || 'var(--primary-color)' }}>
            {value}
            <span style={{ fontSize: '0.5em', marginLeft: '5px', color: 'var(--text-color-light)' }}>{unit}</span>
          </h2>
        </div>
        <div style={{ fontSize: '2em', opacity: 0.6, color: color || 'var(--primary-color)' }}>{icon}</div>
      </div>
    </Card>
  );
};

export default DashboardMetric;