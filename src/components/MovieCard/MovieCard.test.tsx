import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {MovieCard} from './MovieCard';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';


const mockMovie = {
  id: 1,
  title: 'Pulp Fiction',
  release_date: '2004',
  genres: ['Action & Adventure'],
  poster_path: movie1,
  vote_average: '7.9',
  runtime:'2h 34min',
  overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra`,
};
// id,
//     title,
//     release_date,
//     genres,
//     poster_path,
//     click,
//     runtime,
//     vote_average,
//     overview,


describe('MovieCard', () => {

  // test('shoud be rendered', () => {
  //   const { asFragment } = render(
  //     <Provider store={store}>
  //       <MovieCard />
  //     </Provider>
  //   );
  //   const firstRender = asFragment();

  //   expect(firstRender).toMatchSnapshot();
  // });


  test('sorting button should be at document', () => {
    render(
      <Provider store={store}>
        <MovieCard></MovieCard>
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  // test('sorting menu should be openeed if  the sorting button was preseed', async () => {
  //   const { asFragment } = render(
  //     <Provider store={store}>
  //       <MovieCard></MovieCard>
  //     </Provider>
  //   );
  //   const element = screen.getByTestId('sortingMenu');

  //   expect(screen.queryByTestId('sortingMenuConteiner')).toBeNull();
  //   await userEvent.click(element)
  //   expect(screen.getByTestId('sortingMenuConteiner')).toBeInTheDocument();
  // });

  // test('shoud change genre', async () => {
  //   render(
  //     <Provider store={store}>
  //       <MovieCard></MovieCard>
  //     </Provider>
  //   );
  //   const element = screen.queryByTestId('Documentary');

  //   if(element){
  //     await userEvent.click(element)
  //   }

  //   expect().toHaveBeenCalledTimes(1);
  // });
});
