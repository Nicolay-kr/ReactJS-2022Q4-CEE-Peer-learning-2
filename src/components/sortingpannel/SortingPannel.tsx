import React from 'react';
import styles from '../HomePage/HomePage.module.css';
import arrow from '../../assets/images/arrow.svg';
import { useAppDispatch } from '../../app/hooks';
import { getAllMoviesAsync, sortMoviesAsync, filterMoviesAsync } from '../../app/moviesSlice';
import { useSearchParams } from 'react-router-dom';

type HomePageProps = {
  movies?: any;
};

export const SortingPannel: React.FC<HomePageProps> = () => {
  const dispatch = useAppDispatch();

  const [activeGenre, setActiveGenre] = React.useState<number>(0);
  const [activeGenreElement, setActiveGenreElement] = React.useState<any>(null);
  const [genresConteinerLeft, setGenresConteinerLeft] = React.useState<any>(0);
  const [isSortingMenuOpen, setIsSortingMenuOpen] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>('raiting');
  const [searchParams, setSearchParams] = useSearchParams();



  const genresRef = React.createRef<HTMLDivElement>();
  const genresConteinerRef = React.createRef<HTMLDivElement>();

  const handleChangeActiveGenre = (e: any) => {
    const id = e.target.id;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('genre', genres[id]);
    setSearchParams(newSearchParams);

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
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let sortBy = e.target.textContent;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sortBy', sortBy);
    setSearchParams(newSearchParams);

    if(sortBy==='year'){
      sortBy = 'release_date'
    }
    else if(sortBy==='rating'){
      sortBy='vote_average'
    }

    
    dispatch(sortMoviesAsync(sortBy))

    setSortBy(e.target.textContent)
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
        <div data-testid='genresConteiner'  className={styles.genres} ref={genresRef} onClick={handleChangeActiveGenre}>
          {genres.map((gener, index) => (
            <span data-testid={gener} id={`${index}`} key={gener} >
              {gener}
            </span>
          ))}
        </div>

        <div className={styles.ordering}>
          <span style={{ opacity: '0.6' }}>Sort by</span>
          <div data-testid='sortingMenu' className={styles.orderListTitle} onClick={handleSortingOpen}>
            <span >
              {sortBy} <img src={arrow} alt='arrow' />
            </span>
            {isSortingMenuOpen ? (
              <div data-testid='sortingMenuConteiner' className={styles.sortingMenuConteiner}>
                <p id='year' onClick={handleSorting}>year</p>
                <p  id='rating' onClick={handleSorting}>raiting</p>
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
