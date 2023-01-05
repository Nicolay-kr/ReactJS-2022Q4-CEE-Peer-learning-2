import React from 'react';
import styles from './Search.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type FormData = {
  searchText: string;
};

type RouterParams = {
  searchQuery?: string;
};

export const Search:React.FC = () => {

  const params = useParams<RouterParams>();

  const { handleSubmit,register } = useForm<FormData>({
    defaultValues: {
      searchText: params.searchQuery,
    },
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    navigate(`/search/${data.searchText}`);
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
