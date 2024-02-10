import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosClient from '../../axois-client.js';
import ShowDetail from './ShowDetail.js';

jest.mock('../axois-client.js');

describe('ShowDetail Component', () => {
  it('renders user details correctly', async () => {
    const mockUser = {
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      nationality: 'Marocain',
      created_at: '2024-02-01T12:34:56.789Z',
    };

    axiosClient.get.mockResolvedValue({ data: mockUser });

    render(<ShowDetail />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(`ID: ${mockUser.id}`)).toBeInTheDocument();
      expect(screen.getByText(`Name: ${mockUser.name}`)).toBeInTheDocument();
      expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
      expect(screen.getByText(`Nationality: ${mockUser.nationality}`)).toBeInTheDocument();
      expect(screen.getByText(`Create Date: ${mockUser.created_at}`)).toBeInTheDocument();
    });
  });

  it('handles errors correctly', async () => {
    axiosClient.get.mockRejectedValue(new Error('Failed to fetch user'));

    render(<ShowDetail />);
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user')).toBeInTheDocument();
    });
  });
});
