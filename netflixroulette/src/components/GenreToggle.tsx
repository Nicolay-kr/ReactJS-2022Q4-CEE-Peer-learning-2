import React from 'react';
import styles from '../styles/GenreToggle.module.css';
import arrow from '../assets/images/arrow.svg';
import { movies } from '../constants/movies';
import { MovieCard } from './movieCard';

type GenreToggleProps = {
  children?: React.ReactNode;
  genresRef?: HTMLDivElement;
  genres?: string[];
};

type GenreToggleState = {
  activeGenre: number; // like this
  // activeGenreElement: null|HTMLDivElement|DOMRect; // like this
  activeGenreElement: any; // like this
};

class GenreToggle extends React.PureComponent<
  GenreToggleProps,
  GenreToggleState
> {
  constructor(props: GenreToggleProps) {
    super(props);
    this.setActiveGenre = this.setActiveGenre.bind(this);
  }
  state: GenreToggleState = { activeGenre: 0, activeGenreElement: null };

  static genres = { genres: {} };

  private genresRef = React.createRef<HTMLDivElement>();
  private genresConteinerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setState(
      (state: GenreToggleState): GenreToggleState => ({
        activeGenre: 0,
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

  render() {
    const genresConteinerLeft =
      this.genresConteinerRef?.current?.getBoundingClientRect().left
        ? this.genresConteinerRef.current.getBoundingClientRect().left
        : 0;
    const { genres = ['all', 'Documentary', 'Comedy', 'Horror', 'crime'] } =
      this.props;
    const activeGenreElement = this.state.activeGenreElement;

    return (
      <main className={styles.conteiner}>
        <div className={styles.genresConteiner}>
          <div className={styles.firstRow} ref={this.genresConteinerRef}>
            <div className={styles.genres} ref={this.genresRef}>
              {genres.map((gener, index) => (
                <span id={`${index}`} key={gener} onClick={this.setActiveGenre}>
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
              id={movie.id}
              title={movie.title}
              year={movie.year}
              genres={movie.genres}
              image={movie.image}
            ></MovieCard>
          ))}
        </div>
      </main>
    );
  }
}

export default GenreToggle;
