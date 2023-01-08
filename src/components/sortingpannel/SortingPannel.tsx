import React from 'react';
import styles from '../HomePage/HomePage.module.css';
import arrow from '../../assets/images/arrow.svg';
import { useAppDispatch } from '../../app/hooks';
import {
  getAllMoviesAsync,
  filterAllMoviesAsync,
  searchMoviesByTitleAsync,
} from '../../app/moviesSlice';
import { useSearchParams, useParams } from 'react-router-dom';

type HomePageProps = {
  movies?: any;
};
const genres = ['all', 'documentary', 'comedy', 'horror', 'crime'];
const sortingMap = { year: 'release_date', raiting: 'vote_average' };

export const SortingPannel: React.FC<HomePageProps> = () => {
  const dispatch = useAppDispatch();

  const [activeGenre, setActiveGenre] = React.useState<number>(0);
  const [activeGenreElement, setActiveGenreElement] = React.useState<any>(null);
  const [genresConteinerLeft, setGenresConteinerLeft] = React.useState<any>(0);
  const [isSortingMenuOpen, setIsSortingMenuOpen] =
    React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>('raiting');
  const [searchParams, setSearchParams] = useSearchParams();
  let { searchQuery } = useParams();

  const genresRef = React.createRef<HTMLDivElement>();
  const genresConteinerRef = React.createRef<HTMLDivElement>();

  const handleChangeActiveGenre = (e: any) => {
    const id = e.target.id;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('genre', genres[id]);
    setSearchParams(newSearchParams);

    if (searchQuery) {
      dispatch(
        searchMoviesByTitleAsync(
          `${searchQuery},${sortingMap[sortBy]},${genres[id].toLowerCase()}`
        )
      );
    } else {
      dispatch(
        filterAllMoviesAsync(
          `${sortingMap[sortBy]},${genres[id].toLowerCase()}`
        )
      );
    }

    setActiveGenre(id);
    setActiveGenreElement(
      genresRef?.current?.children[id].getBoundingClientRect()
    );
  };

  const handleSortingOpen = () => {
    setIsSortingMenuOpen(true);
  };

  const handleSortingClose = () => {
    setIsSortingMenuOpen(false);
  };

  const handleSorting = (e, sortQuery = 'raiting') => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const sortBy = e.target.textContent;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortBy', sortBy);
    setSearchParams(newSearchParams);

    if (searchQuery) {
      dispatch(
        searchMoviesByTitleAsync(
          `${searchQuery},${sortingMap[sortBy]},${genres[
            activeGenre
          ].toLowerCase()}`
        )
      );
    } else {
      dispatch(
        filterAllMoviesAsync(
          `${sortingMap[sortBy]},${genres[activeGenre].toLowerCase()}`
        )
      );
    }

    setSortBy(sortBy);
    handleSortingClose();
  };

  const applyfilter = (
    sortQuery = 'raiting',
    genre: string = '',
    searchQuery
  ) => {
    let sortBy = sortQuery;
    setSortBy(sortBy);
    const id = genres.findIndex((item) => item === genre);

    if (searchQuery) {
      dispatch(
        searchMoviesByTitleAsync(
          `${searchQuery},${sortingMap[sortBy]},${genres[id].toLowerCase()}`
        )
      );
    } else {
      dispatch(
        filterAllMoviesAsync(
          `${sortingMap[sortBy]},${genres[id].toLowerCase()}`
        )
      );
    }

    setActiveGenre(id);
    setActiveGenreElement(
      genresRef?.current?.children[id].getBoundingClientRect()
    );
  };

  React.useEffect(() => {
    dispatch(getAllMoviesAsync());
  }, []);

  React.useEffect(() => {
    setActiveGenreElement(
      genresRef?.current?.children[activeGenre].getBoundingClientRect()
    );
    setGenresConteinerLeft(
      genresConteinerRef?.current?.getBoundingClientRect().left
        ? genresConteinerRef.current.getBoundingClientRect().left
        : 0
    );
  }, []);

  React.useEffect(() => {
    const sortByQuery = searchParams.get('sortBy');
    const genreQuery = searchParams.get('genre');
    const newSearchParams = new URLSearchParams(searchParams);

    if (!genreQuery) {
      newSearchParams.set('genre', genres[activeGenre].toLowerCase());
    }

    if (!sortByQuery) {
      newSearchParams.set('sortBy', sortBy);
    }

    setSearchParams(newSearchParams);

    if (sortByQuery || genreQuery) {
      applyfilter(
        sortByQuery ? sortByQuery : 'raiting',
        genreQuery ? genreQuery : 'all',
        searchQuery
      );
    }
  }, []);

  return (
    <div className={styles.genresConteiner} ref={genresConteinerRef}>
      <div className={styles.firstRow}>
        <div
          data-testid='genresConteiner'
          className={styles.genres}
          ref={genresRef}
          onClick={handleChangeActiveGenre}
        >
          {genres.map((gener, index) => (
            <span data-testid={gener} id={`${index}`} key={gener}>
              {gener}
            </span>
          ))}
        </div>

        <div className={styles.ordering}>
          <span style={{ opacity: '0.6' }}>Sort by</span>
          <div
            data-testid='sortingMenu'
            className={styles.orderListTitle}
            onClick={handleSortingOpen}
          >
            <span>
              {sortBy} <img src={arrow} alt='arrow' />
            </span>
            {isSortingMenuOpen ? (
              <div
                data-testid='sortingMenuConteiner'
                className={styles.sortingMenuConteiner}
              >
                <p id='year' onClick={handleSorting}>
                  year
                </p>
                <p id='rating' onClick={handleSorting}>
                  raiting
                </p>
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
  );
};

export default SortingPannel;
