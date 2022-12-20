import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

describe('Homepage', () => {
  test('renders netflix', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    // const linkElement = screen.getByText(/learn react/i);
    const firstRender = asFragment();

    // expect(screen.getByText('netflix')).toBeInTheDocument();
    expect(firstRender).toMatchSnapshot();
  });
});
