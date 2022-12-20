import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './components/Footer';
import HomePage from './components/HomePage';

describe('Homepage', () => {
  test('renders netflix', () => {

    const { asFragment } = render(<HomePage/>);
    // const linkElement = screen.getByText(/learn react/i);
    const firstRender = asFragment();

    // expect(screen.getByText('netflix')).toBeInTheDocument();
    expect(firstRender).toMatchInlineSnapshot()
  });

});

describe('Footer', () => {

  test('renders learn react link', () => {
    render(<Footer />);

    expect(screen.getByText('netflix')).toBeInTheDocument();
  });
});
