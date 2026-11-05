import { render, screen } from '@testing-library/react';
import Apps from './pages/Apps';

test('shows the new apps with their configured URLs', () => {
  render(<Apps />);

  const apps = [
    ['FMS', 'https://fms.doradora58.com/'],
    ['OrderManagement', 'https://order-management.doradora58.com/'],
    ['AutoVehicleEmulator', 'https://auto-vehicle-emulator.doradora58.com/'],
    ['Jaeger', 'https://jaeger.doradora58.com'],
    ['Grafana', 'https://grafana.doradora58.com/'],
  ];

  apps.forEach(([title, url]) => {
    expect(screen.getByRole('link', { name: new RegExp(`^${title}:`) })).toHaveAttribute('href', url);
  });
});
