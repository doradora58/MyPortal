import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

import Home from './Home';

test('shows useful home shortcuts without placeholder dashboard metrics', () => {
  render(<Home />);

  expect(screen.getByRole('heading', { name: /すべてのツールに/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /アプリ一覧を見る/ })).toHaveAttribute('href', '/apps');
  expect(screen.getByRole('link', { name: /FMS/ })).toHaveAttribute('href', 'https://fms.doradora58.com/');
  expect(screen.queryByText(/今月の投稿数|未読ドキュメント|総ユーザー数/)).not.toBeInTheDocument();
});
