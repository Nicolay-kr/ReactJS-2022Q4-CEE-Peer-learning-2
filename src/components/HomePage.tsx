import React from 'react';
import styles from '../styles/HomePage.module.css';
import { MovieCard } from './MovieCard';
import bitmap from '../assets/images/bitmap.png';
import { Search } from './Search';
import { MovieInfo, IMovieInfoProps } from './MovieInfo';
import { useMovieInfoTogle } from './useMovieInfoTogle';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchMoviesAsync, selectMovies } from '../app/moviesSlice';
import SortingPannel from './sortingpannel/SortingPannel';
import AddMovieButton from './addMovieButton/AddMovieButton';

type HomePageProps = {
  children?: React.ReactNode;
  genresRef?: HTMLDivElement;
  genres?: string[];
  onOpenMovieModal: (mode: string, movie: any) => void;
  openDeleteMovieModal: (id: string | number) => void;
  movies?: any;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  // console.log(movies.moviesList)

  const [
    setActiveCardMovie,
    closeActiveCardMovie,
    activeMovie,
    isOpenCardDescription,
  ] = useMovieInfoTogle(movies.moviesList);

  const handleAddMovieClick = () => {
    props.onOpenMovieModal('add', null);
  };

  console.log(activeMovie);

  React.useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, []);

  return (
    <>
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

          {isOpenCardDescription && activeMovie ? (
            <MovieInfo
              id={activeMovie.id}
              title={activeMovie.title}
              tagline={activeMovie.tagline}
              vote_count={activeMovie.vote_count}
              budget={activeMovie.budget}
              release_date={activeMovie.release_date}
              revenue={activeMovie.revenue}
              genres={activeMovie.genres}
              poster_path={activeMovie.poster_path}
              overview={activeMovie.overview}
              runtime={activeMovie.runtime}
              vote_average={activeMovie.vote_average}
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
                    onOpenMovieModal={props.onOpenMovieModal}
                    openDeleteMovieModal={props.openDeleteMovieModal}
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
