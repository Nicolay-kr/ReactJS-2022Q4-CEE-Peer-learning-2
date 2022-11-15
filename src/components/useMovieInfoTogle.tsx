import * as React from 'react';

export function useMovieInfoTogle(movies) {

  const [isOpenCardDescription, setIsOpenCardDescription] =
    React.useState<boolean>(false);

  const [activeMovie, setActiveMovie] = React.useState<any>({
    id: movies[0].id,
    title: movies[0].title,
    year: movies[0].year,
    image: movies[0].image,
    rating: movies[0].rating,
    description: movies[0].description,
    time: movies[0].time,
    genres: movies[0].genres,
  });

  const setActiveCardMovie = React.useCallback(
    (id: string | number) => {
      const activeMovie = movies[id];
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
