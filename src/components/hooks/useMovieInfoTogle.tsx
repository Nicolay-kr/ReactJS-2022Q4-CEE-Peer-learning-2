import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { getMovieByIdAsync } from '../../app/activeMovieSlice';


export function useMovieInfoTogle() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const movieIdQuary = searchParams.get('movie');


  const [isOpenCardDescription, setIsOpenCardDescription] =
    React.useState<boolean>(false);

  const [activeMovie, setActiveMovie] = React.useState<any>(null);

  const setActiveCardMovie = React.useCallback(async (id: string | number) => {
    const activeMovie = await dispatch(getMovieByIdAsync(id));
    setActiveMovie(activeMovie.payload);

    setIsOpenCardDescription(true);
  }, []);



  React.useEffect(() => {
    if(movieIdQuary){
      setActiveCardMovie(movieIdQuary)
    }
  }, [movieIdQuary]);


  const closeActiveCardMovie: any = () => {
    const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('movie');
        setSearchParams(newSearchParams);
    setIsOpenCardDescription(false);
  };

  return [setActiveCardMovie, closeActiveCardMovie, isOpenCardDescription, activeMovie];
}
