import React from 'react';
import styles from '../HomePage/HomePage.module.css';
import loop from '../../assets/images/loop.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllMoviesAsync, selectMovies } from '../../app/moviesSlice';

type AddMovieButtonProps = {
  isOpenCardDescription: Boolean;
  closeActiveCardMovie: () => void;
  handleAddMovieClick: () => void;
};

export const AddMovieButton: React.FC<AddMovieButtonProps> = ({
  isOpenCardDescription = false,
  closeActiveCardMovie,
  handleAddMovieClick,
}) => {
  const moviesList = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  return (
    <>
      {!isOpenCardDescription ? (
        <button className={styles.addMovieButton} onClick={handleAddMovieClick}>
          + add movie
        </button>
      ) : (
        <img
          className={styles.searchIcon}
          src={loop}
          alt='loop icon'
          onClick={closeActiveCardMovie}
        />
      )}
    </>
  );
};

export default AddMovieButton;
