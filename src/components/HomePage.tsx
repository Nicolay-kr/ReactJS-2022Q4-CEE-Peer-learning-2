import React from 'react';
import styles from '../styles/HomePage.module.css';
import arrow from '../assets/images/arrow.svg';
import { movies } from '../constants/movies';
import { MovieCard } from './MovieCard';
import bitmap from '../assets/images/bitmap.png';
import {Search} from './Search';
import { MovieInfo, IMovieInfoProps } from './MovieInfo';
import loop from '../assets/images/loop.svg';
// import AddMovieForm from './modals/MovieModal/MovieModal';

type HomePageProps = {
  children?: React.ReactNode;
  genresRef?: HTMLDivElement;
  genres?: string[];
  onOpenMovieModal: (mode: string, movie: any)=>void;
  // openEditMovieModal: ()=>void;
};

type HomePageState = {
  activeGenre: number;
  activeGenreElement: any;
  activeMovie: IMovieInfoProps;
  isOpenCardDescription: boolean;
  isOpenAddMovie: boolean;
};

class HomePage extends React.PureComponent<
  HomePageProps,
  HomePageState
> {
  constructor(props: HomePageProps) {
    super(props);
    this.setActiveGenre = this.setActiveGenre.bind(this);
    this.setActiveCardMovie = this.setActiveCardMovie.bind(this);
    this.closeActiveCardMovie = this.closeActiveCardMovie.bind(this);
    this.handleAddMovieClick = this.handleAddMovieClick.bind(this);
  }
  state: HomePageState = {
    activeGenre: 0,
    activeGenreElement: null,
    activeMovie: {
      id: movies[0].id,
      title: movies[0].title,
      year: movies[0].year,
      image: movies[0].image,
      score: movies[0].score,
      description: movies[0].description,
      time: movies[0].time,
      genres: movies[0].genres,
    },
    isOpenCardDescription: false,
    isOpenAddMovie: true,
  };

  static genres = { genres: {} };

  private genresRef = React.createRef<HTMLDivElement>();
  private genresConteinerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setState(
      (state: HomePageState): HomePageState => ({
        ...state,
        activeGenreElement:
          this.genresRef?.current?.children[
            this.state.activeGenre
          ].getBoundingClientRect(),
      })
    );
  }

  setActiveGenre(e: any) {
    const id = e.target.id;
    this.setState((state) => ({
      activeGenre: id,
      activeGenreElement:
        this.genresRef?.current?.children[id].getBoundingClientRect(),
    }));
  }

  setActiveCardMovie(id: string | number) {
    const activeMovie = movies[id];

    this.setState((state) => ({
      ...state,
      isOpenCardDescription: true,
      activeMovie: activeMovie,
    }));
  }

  closeActiveCardMovie() {
    this.setState((state) => ({
      ...state,
      isOpenCardDescription: false,
    }));
  }

  handleAddMovieClick() {
    this.props.onOpenMovieModal('add',null)
  }

  render() {
    const genresConteinerLeft =
      this.genresConteinerRef?.current?.getBoundingClientRect().left
        ? this.genresConteinerRef.current.getBoundingClientRect().left
        : 0;
    const { genres = ['all', 'Documentary', 'Comedy', 'Horror', 'crime'] } =
      this.props;
    const activeGenreElement = this.state.activeGenreElement;
    // const isOpenAddMovie = this.state.isOpenAddMovie;

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
              {!this.state.isOpenCardDescription ? (
                <button className={styles.addMovieButton} onClick={this.handleAddMovieClick}>+ add movie</button>
              ) : (
                <img
                  className={styles.searchIcon}
                  src={loop}
                  alt='loop icon'
                  onClick={this.closeActiveCardMovie}
                />
              )}
            </div>

            {this.state.isOpenCardDescription ? (
              <MovieInfo
                key={this.state.activeMovie.id}
                id={this.state.activeMovie.id}
                title={this.state.activeMovie.title}
                year={this.state.activeMovie.year}
                genres={this.state.activeMovie.genres}
                image={this.state.activeMovie.image}
                score={this.state.activeMovie.score}
                description={this.state.activeMovie.description}
                time={this.state.activeMovie.time}
                
              ></MovieInfo>
            ) : (
              <Search
              />
            )}
          </div>
        </header>

        <main className={styles.mainConteiner}>
          <div className={styles.genresConteiner}>
            <div className={styles.firstRow} ref={this.genresConteinerRef}>
              <div className={styles.genres} ref={this.genresRef}>
                {genres.map((gener, index) => (
                  <span
                    id={`${index}`}
                    key={gener}
                    onClick={this.setActiveGenre}
                  >
                    {gener}
                  </span>
                ))}
              </div>

              <div className={styles.ordering}>
                <span style={{ opacity: '0.6' }}>Sort by</span>
                <span className={styles.orderListTitle}>
                  release date <img src={arrow} alt='arrow' />
                </span>
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
                score={movie.score}
                click={this.setActiveCardMovie}
                onOpenMovieModal={this.props.onOpenMovieModal}
              ></MovieCard>
            ))}
          </div>
        </main>
      </>
    );
  }
}

export default HomePage;
