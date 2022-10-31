import * as React from 'react';
import styles from '../styles/MovieCard.module.css';

export interface IMovieCardProps {
  id: number;
  title: string;
  year: string;
  genres: string[];
  image: string;
}

export function MovieCard({ id, title, year, genres, image }: IMovieCardProps):JSX.Element {
  return (
    <div className={styles.conteiner}>
      <img src={image} alt='movie poster' />
      <div className={styles.titleConteiner}>
        <p className={styles.title}>{title}</p>
        <div className={styles.year}>{year}</div>
      </div>
      <p className={styles.genres}>{genres.join(', ')}</p>
    </div>
  );
}
