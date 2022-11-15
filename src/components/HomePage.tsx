import React from 'react';
import styles from '../styles/HomePage.module.css';
import arrow from '../assets/images/arrow.svg';
import { movies as initialMovies } from '../constants/movies';
import { MovieCard } from './MovieCard';
import bitmap from '../assets/images/bitmap.png';
import { Search } from './Search';
import { MovieInfo, IMovieInfoProps } from './MovieInfo';
import loop from '../assets/images/loop.svg';
import { sortingMovies } from '../utills/sorting';
import { useMovieInfoTogle } from './useMovieInfoTogle';
// import AddMovieForm from './modals/MovieModal/MovieModal';

type HomePageProps = {
  children?: React.ReactNode;
  genresRef?: HTMLDivElement;
  genres?: string[];
  onOpenMovieModal: (mode: string, movie: any) => void;
  openDeleteMovieModal: (id: string | number) => void;
  movies?: any;
};

export const HomePage: React.FC<HomePageProps> = (props) => {

  const [activeGenre, setActiveGenre] = React.useState<number>(0);
  const [activeGenreElement, setActiveGenreElement] = React.useState<any>(null);
  const [genresConteinerLeft, setGenresConteinerLeft] = React.useState<any>(0);
  const [isOpenAddMovie, setIsOpenAddMovie] = React.useState<boolean>(true);
  const [isSortingMenuOpen, setIsSortingMenuOpen] =
    React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>('year');
  const [movies, setMovies] = React.useState(initialMovies);

  const [setActiveCardMovie,closeActiveCardMovie,activeMovie,isOpenCardDescription] = useMovieInfoTogle(movies)

  const genresRef = React.createRef<HTMLDivElement>();
  const genresConteinerRef = React.createRef<HTMLDivElement>();

  const handleChangeActiveGenre = (e: any) => {
    const id = e.target.id;
    setActiveGenre(id);
    setActiveGenreElement(
      genresRef?.current?.children[id].getBoundingClientRect()
    );
  };


  const handleAddMovieClick = () => {
    props.onOpenMovieModal('add', null);
  };

  const handleSortingOpen = () => {
    setIsSortingMenuOpen(true);
  };

  const handleSortingClose = () => {
    setIsSortingMenuOpen(false);
  };

  const handleSorting = (e) => {
    const sortBy = e.target.textContent;
    const sortMoviesArr = sortingMovies(movies, sortBy);
    setSortBy(sortBy);
    setMovies(sortMoviesArr);
    handleSortingClose();
  };

  const { genres = ['all', 'Documentary', 'Comedy', 'Horror', 'crime'] } =
    props;


  React.useEffect(() => {
    setMovies(sortingMovies(movies, sortBy));
    setActiveGenreElement(
      genresRef?.current?.children[activeGenre].getBoundingClientRect()
    );
    setGenresConteinerLeft(genresConteinerRef?.current?.getBoundingClientRect().left
    ? genresConteinerRef.current.getBoundingClientRect().left
    : 0)
  },[]);

  return (
    <>
      {/* {isOpenAddMovie?(<AddMovieForm genres={genres}></AddMovieForm>):null} */}

      <header
        className={styles.headerConteiner}
        style={{ backgroundImage: `url(${bitmap})` }}
      >
        <div className={styles.headerContent}>
          <div className={styles.contentAddMovieButton}>
            <span className={styles.name}>
              <strong>netflix</strong>roulette
            </span>

            {!isOpenCardDescription ? (
              <button
                className={styles.addMovieButton}
                onClick={handleAddMovieClick}
              >
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
          </div>

          {isOpenCardDescription ? (
            <MovieInfo
              key={activeMovie.id}
              id={activeMovie.id}
              title={activeMovie.title}
              year={activeMovie.year}
              genres={activeMovie.genres}
              image={activeMovie.image}
              rating={activeMovie.rating}
              description={activeMovie.description}
              time={activeMovie.time}
            ></MovieInfo>
          ) : (
            <Search />
          )}
        </div>
      </header>

      <main className={styles.mainConteiner}>
        <div className={styles.genresConteiner} ref={genresConteinerRef}>
          <div className={styles.firstRow} >
            <div className={styles.genres} ref={genresRef}>
              {genres.map((gener, index) => (
                <span
                  id={`${index}`}
                  key={gener}
                  onClick={handleChangeActiveGenre}
                >
                  {gener}
                </span>
              ))}
            </div>

            <div className={styles.ordering}>
              <span style={{ opacity: '0.6' }}>Sort by</span>
              <div className={styles.orderListTitle}>
                <span onClick={handleSortingOpen}>
                  {sortBy} <img src={arrow} alt='arrow' />
                </span>
                {isSortingMenuOpen ? (
                  <div className={styles.sortingMenuConteiner}>
                    <p onClick={handleSorting}>year</p>
                    <p onClick={handleSorting}>rating</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={styles.secondRow}
            style={{
              position: 'relative',
            }}
          >
            <div
              className={styles.activeLine}
              style={{
                position: 'absolute',
                width: activeGenreElement
                  ? `${activeGenreElement.width}px`
                  : '100px',
                left: activeGenreElement
                  ? `${activeGenreElement.x - genresConteinerLeft}px`
                  : '100px',
              }}
            ></div>
            <div className={styles.line}>
              <span className={styles.firstline}></span>
              <span className={styles.secondline}></span>
              <span className={styles.thirdLine}></span>
            </div>
          </div>
        </div>
        <p className={styles.foundMovieText}>39 movies found</p>
        <div className={styles.movieConteiner}>
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              id={index}
              title={movie.title}
              year={movie.year}
              genres={movie.genres}
              image={movie.image}
              description={movie.description}
              time={movie.time}
              rating={movie.rating}
              click={setActiveCardMovie}
              onOpenMovieModal={props.onOpenMovieModal}
              openDeleteMovieModal={props.openDeleteMovieModal}
            ></MovieCard>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
