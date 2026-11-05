import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
}), { virtual: true });

import Login from './Login';
import Profile from './Profile';

test('describes the workspace without exposing personal details', () => {
  const { container } = render(<Profile />);

  expect(screen.getByRole('heading', { name: 'このポータルについて' })).toBeInTheDocument();
  expect(screen.getByText('個人情報を掲載していません')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /アプリ一覧を見る/ })).toHaveAttribute('href', '/apps');
  expect(container.textContent).not.toMatch(/\b\d{3}[- ]?\d{4}\b|@/);
});

test('clearly marks login as under construction and asks users not to enter credentials', () => {
  render(<Login />);

  expect(screen.getByRole('heading', { name: 'ログイン機能を準備中です' })).toBeInTheDocument();
  expect(screen.getByText(/パスワードなどの情報を入力しないでください/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /アプリ一覧へ戻る/ })).toHaveAttribute('href', '/apps');
  expect(screen.queryByLabelText(/password|パスワード/i)).not.toBeInTheDocument();
});
