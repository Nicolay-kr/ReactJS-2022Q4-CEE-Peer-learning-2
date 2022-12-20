import React from 'react';
import styles from '../HomePage/HomePage.module.css';
import arrow from '../../assets/images/arrow.svg';
import { sortingMovies } from '../../utills/sorting';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { filterMoviesAsync, getAllMoviesAsync, selectMovies, sortMoviesAsync } from '../../app/moviesSlice';

type HomePageProps = {
  movies?: any;
};

export const SortingPannel: React.FC<HomePageProps> = ({movies}) => {
  const moviesList = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  const [activeGenre, setActiveGenre] = React.useState<number>(0);
  const [activeGenreElement, setActiveGenreElement] = React.useState<any>(null);
  const [genresConteinerLeft, setGenresConteinerLeft] = React.useState<any>(0);
  const [isSortingMenuOpen, setIsSortingMenuOpen] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>('year');



  const genresRef = React.createRef<HTMLDivElement>();
  const genresConteinerRef = React.createRef<HTMLDivElement>();

  const handleChangeActiveGenre = (e: any) => {
    const id = e.target.id;
    if(id===0){
      dispatch(getAllMoviesAsync());
    }else{
      dispatch(filterMoviesAsync(genres[id]))
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

  const handleSorting = (e) => {
    let sortBy = e.target.textContent;
    if(sortBy==='year'){
      sortBy = 'release_date'
    }
    else if(sortBy==='rating'){
      sortBy='vote_average'
    }
    console.log(sortBy)
    dispatch(sortMoviesAsync(sortBy))

    // const sortMoviesArr = sortingMovies(movies, sortBy);
    // setSortBy(sortBy);
    // setMovies(sortMoviesArr);
    handleSortingClose();
  };

  const genres = ['all', 'Documentary', 'Comedy', 'Horror', 'crime'] 

  React.useEffect(() => {
    // setMovies(sortingMovies(movies, sortBy));
    setActiveGenreElement(
      genresRef?.current?.children[activeGenre].getBoundingClientRect()
    );
    setGenresConteinerLeft(
      genresConteinerRef?.current?.getBoundingClientRect().left
        ? genresConteinerRef.current.getBoundingClientRect().left
        : 0
    );
  }, []);

  // React.useEffect(() => {
  //   dispatch(getAllMoviesAsync());
  // }, []);

  return (
    <div className={styles.genresConteiner} ref={genresConteinerRef}>
      <div className={styles.firstRow}>
        <div className={styles.genres} ref={genresRef}>
          {genres.map((gener, index) => (
            <span id={`${index}`} key={gener} onClick={handleChangeActiveGenre}>
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
              ? `${activeGenreElement.x - genresConteinerLeft }px`
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
