import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('testando a página de Login no Front End', () => {
  it('Será validado o `data-testid=\'common_login__input-email\'`', () => {
    render(<App />);
    const emailInput = screen.getByTestId(/common_login__input-email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('Será validado o `data-testid=\'common_login__input-password\'`', () => {
    render(<App />);
    const passwordInput = screen.getByTestId(/common_login__input-password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('Será validado o `data-testid=\'common_login__button-login\'`', () => {
    render(<App />);
    const button = screen.getByTestId(/common_login__button-login/i);
    expect(button).toBeInTheDocument();
  });
});
