import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('Homepage', () => {
  test('renders netflix', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    );
    // const linkElement = screen.getByText(/learn react/i);
    const firstRender = asFragment();

    expect(screen.getByText('netflix')).toBeInTheDocument();
    expect(firstRender).toMatchSnapshot();
  });
});
