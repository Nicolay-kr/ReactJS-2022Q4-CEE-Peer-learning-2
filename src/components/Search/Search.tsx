import React from 'react';
import styles from './Search.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { searchMoviesByTitleAsync, sortMoviesAsync } from '../../app/moviesSlice';
import { useAppDispatch } from '../../app/hooks';

type FormData = {
  searchText: string;
};

type RouterParams = {
  searchQuery?: string;
};

export const Search:React.FC = () => {
  const dispatch = useAppDispatch();

  const params = useParams<RouterParams>();
  const [searchParams] = useSearchParams();

  const { handleSubmit,register } = useForm<FormData>({
    defaultValues: {
      searchText: params.searchQuery,
    },
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    if(data){
      dispatch(searchMoviesByTitleAsync(data.searchText));
      navigate(`/search/${data.searchText}?${searchParams}`);
    }else{
      dispatch(sortMoviesAsync('vote_average'))
      navigate(`/search`);
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
}
