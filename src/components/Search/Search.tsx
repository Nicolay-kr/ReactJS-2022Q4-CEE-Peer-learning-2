import React from 'react';
import styles from './Search.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  filterAllMoviesAsync,
  searchMoviesByTitleAsync,
} from '../../app/moviesSlice';
import { useAppDispatch } from '../../app/hooks';

type FormData = {
  searchText: string;
};

type RouterParams = {
  searchQuery?: string;
};
const sortingMap = {'year':'release_date','raiting':'vote_average'}

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const params = useParams<RouterParams>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      searchText: params.searchQuery,
    },
  });
  const navigate = useNavigate();


  const onSubmit = handleSubmit((data) => {

    const sortByQuery = searchParams.get('sortBy');
    const genreQuery = searchParams.get('genre');
    if (data) {
        dispatch(
          searchMoviesByTitleAsync(
            `${data.searchText},${sortingMap[sortByQuery?sortByQuery:'raiting']},${genreQuery?genreQuery:'all'}`
          )
        );
 
      navigate(`/search/${data.searchText}${searchParams? '?' + searchParams:''}`);
    } else {
      navigate(`/search`);
      dispatch(filterAllMoviesAsync('vote_average,all'));
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('sortBy', 'raiting');
      setSearchParams(newSearchParams);
    }
  });

  return (
    <div className={styles.searchFormConteiner}>
      <h2 className={styles.title}>FIND YOUR MOVIE</h2>
      <form className={styles.formConteiner} onSubmit={onSubmit}>
        <input
          type='search'
          placeholder='What do you want to watch?'
          className={styles.inputField}
          {...register('searchText')}
        ></input>
        <button type='submit' className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
};
