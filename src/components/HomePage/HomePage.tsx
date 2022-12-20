import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { MovieCard } from '../MovieCard/MovieCard';
import bitmap from '../../assets/images/bitmap.png';
import { Search } from '../Search/Search';
import { MovieInfo } from '../MovieInfo/MovieInfo';
import { useMovieInfoTogle } from '../hooks/useMovieInfoTogle';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllMoviesAsync, selectMovies } from '../../app/moviesSlice';
import SortingPannel from '../Sortingpannel/SortingPannel';
import AddMovieButton from '../AddMovieButton/AddMovieButton';
import { Modal } from '../ReactPortal';
import MovieModal from '../modals/MovieModal/MovieModal';

type HomePageProps = {
  children?: React.ReactNode;
  genresRef?: HTMLDivElement;
  genres?: string[];
  movies?: any;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const [isMovieAddModalopen, setIsMovieAddModalopen] =
    useState<boolean>(false);

  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  const [setActiveCardMovie, closeActiveCardMovie, isOpenCardDescription] =
    useMovieInfoTogle();

  const handleAddMovieClick = () => {
    setIsMovieAddModalopen(true);
  };

  React.useEffect(() => {
    dispatch(getAllMoviesAsync());
  }, []);

  return (
    <>
      {isMovieAddModalopen && (
        <Modal>
          <MovieModal
            movie={null}
            mode='add'
            onClose={() => setIsMovieAddModalopen(false)}
          ></MovieModal>{' '}
        </Modal>
      )}
      <header
        className={styles.headerConteiner}
        style={{ backgroundImage: `url(${bitmap})` }}
      >
        <div className={styles.headerContent}>
          <div className={styles.contentAddMovieButton}>
            <span className={styles.name}>
              <strong>netflix</strong>roulette
            </span>
            <AddMovieButton
              isOpenCardDescription={isOpenCardDescription}
              closeActiveCardMovie={closeActiveCardMovie}
              handleAddMovieClick={handleAddMovieClick}
            ></AddMovieButton>
          </div>

          {isOpenCardDescription && movies.activeMovie ? (
            <MovieInfo
              id={movies.activeMovie.id}
              title={movies.activeMovie.title}
              tagline={movies.activeMovie.tagline}
              vote_count={movies.activeMovie.vote_count}
              budget={movies.activeMovie.budget}
              release_date={movies.activeMovie.release_date}
              revenue={movies.activeMovie.revenue}
              genres={movies.activeMovie.genres}
              poster_path={movies.activeMovie.poster_path}
              overview={movies.activeMovie.overview}
              runtime={movies.activeMovie.runtime}
              vote_average={movies.activeMovie.vote_average}
            ></MovieInfo>
          ) : (
            <Search />
          )}
        </div>
      </header>

      <main className={styles.mainConteiner}>
        <SortingPannel></SortingPannel>

        <p className={styles.foundMovieText}>
          {movies.moviesList.length} movies found
        </p>
        <div className={styles.movieConteiner}>
          {movies.moviesList.length > 1
            ? movies.moviesList.map((movie) => (
                <div key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    tagline={movie.tagline}
                    vote_count={movie.vote_count}
                    budget={movie.budget}
                    release_date={movie.release_date}
                    revenue={movie.revenue}
                    genres={movie.genres}
                    poster_path={movie.poster_path}
                    overview={movie.overview}
                    runtime={movie.runtime}
                    vote_average={movie.vote_average}
                    click={setActiveCardMovie}
                  ></MovieCard>
                </div>
              ))
            : null}
        </div>
      </main>
    </>
  );
};

export default HomePage;
