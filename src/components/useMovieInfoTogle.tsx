import * as React from 'react';

export function useMovieInfoTogle(movies) {

  const [isOpenCardDescription, setIsOpenCardDescription] =
    React.useState<boolean>(false);

  const [activeMovie, setActiveMovie] = React.useState<any>(null);

  const setActiveCardMovie = React.useCallback(
    (id: string | number) => {
      const activeMovie = movies.find(movie=>movie.id===id);
      setActiveMovie(activeMovie);
      setIsOpenCardDescription(true);
    },
    [movies]
  );

  const closeActiveCardMovie = () => {
    setIsOpenCardDescription(false);
  };

  return [setActiveCardMovie,closeActiveCardMovie,activeMovie,isOpenCardDescription]
}
