import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosMock from 'axios-mock-adapter';
import Login from './Login';

const mockAxios = new axiosMock();

describe('Login component', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('renders login form', () => {
    expect(screen.getByText('Login into your account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Not registered?')).toBeInTheDocument();
  });

  it('submits form and logs in', async () => {
    mockAxios.onPost('/login').reply(200, { token: 'mockToken', user: { role: 'user' } });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'P@ssword123' } });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Welcome to the Home page')).toBeInTheDocument();
    });
  });

});
