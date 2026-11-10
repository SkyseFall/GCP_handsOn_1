import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';
import { createAppStore } from './store';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('Counter Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches initial counter and handles increment/decrement/reset', async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValueOnce({ data: 5 });
    axios.post.mockResolvedValueOnce({ data: 6 });
    axios.post.mockResolvedValueOnce({ data: 5 });
    axios.post.mockResolvedValueOnce({ data: 0 });

    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
    });
    expect(screen.getByTestId('connection-status')).toHaveTextContent('Connected');

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await waitFor(() => {
      expect(screen.getByTestId('counter-value')).toHaveTextContent('6');
    });

    await user.click(screen.getByRole('button', { name: /decrement/i }));
    await waitFor(() => {
      expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
    });

    await user.click(screen.getByRole('button', { name: /reset/i }));
    await waitFor(() => {
      expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    });
  });

  test('shows error banner when backend request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <Provider store={createAppStore()}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network Error');
    });
    expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');
  });
});

