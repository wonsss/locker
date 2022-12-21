import App from 'App';
import { renderWithProviders } from 'mocks/renderWithProviders';

import { screen } from '@testing-library/react';

describe('테스트', () => {
  test('Home', async () => {
    renderWithProviders(<App />, { route: '/home' });

    await screen.findByText(/사물함 배정/);
  });
});
