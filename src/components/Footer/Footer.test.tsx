import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';



describe('Footer', () => {

  test('renders learn react link', () => {
    render(<Footer />);

    expect(screen.getByText('netflix')).toBeInTheDocument();
  });
});
