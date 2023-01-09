import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockMovie = {
  id: 1,
  title: 'Pulp Fiction',
  release_date: 2004,
  genres: ['Action & Adventure'],
  poster_path: 'some_path',
  vote_average: 7.9,
  runtime: 165544561,
  overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra`,
};

describe('MovieCard', () => {
  test('should remder movie card with current title', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MovieCard
            click={() => null}
            id={mockMovie.id}
            title={mockMovie.title}
            vote_average={mockMovie.vote_average}
            release_date={mockMovie.release_date}
            poster_path={mockMovie.poster_path}
            overview={mockMovie.overview}
            genres={mockMovie.genres}
            runtime={mockMovie.runtime}
          ></MovieCard>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
  });
});
