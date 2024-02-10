import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosMock from 'axios-mock-adapter';
import Signup from './Signup';

const mockAxios = new axiosMock();

describe('Signup component', () => {
  beforeEach(() => {
    render(<Signup />);
  });

  it('renders signup form', () => {
    expect(screen.getByText('Signup for Free')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat Password')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    expect(screen.getByText('Already registered?')).toBeInTheDocument();
  });

  it('submits form and signs up', async () => {
    mockAxios.onPost('/signup').reply(200, { token: 'mockToken', user: { name: 'AliTest', email: 'Ali@gmail.com' } });

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'AliTest' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'Ali@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'P@ssword123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), { target: { value: 'P@ssword123' } });

    fireEvent.click(screen.getByText('Signup'));

    await waitFor(() => {
      expect(screen.getByText('Welcome, AliTest!')).toBeInTheDocument();
    });
  });

});
