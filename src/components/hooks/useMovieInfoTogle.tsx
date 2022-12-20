import * as React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getMovieByIdAsync } from '../../app/moviesSlice';

export function useMovieInfoTogle() {
  const dispatch = useAppDispatch();

  const [isOpenCardDescription, setIsOpenCardDescription] =
    React.useState<boolean>(false);

  // const [activeMovie, setActiveMovie] = React.useState<any>(null);

  const setActiveCardMovie = React.useCallback((id: string | number) => {
    // const activeMovie = movies.find(movie=>movie.id===id);
    dispatch(getMovieByIdAsync(id));

    setIsOpenCardDescription(true);
  }, []);

  const closeActiveCardMovie: any = () => {
    setIsOpenCardDescription(false);
  };

  return [setActiveCardMovie, closeActiveCardMovie, isOpenCardDescription];
}
