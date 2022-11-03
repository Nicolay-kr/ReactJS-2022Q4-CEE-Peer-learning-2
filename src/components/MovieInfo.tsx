import * as React from 'react';
import styles from '../styles/MovieInfo.module.css';

export interface IMovieInfoProps {
  id: number;
  title: string;
  year: string;
  genres: string[];
  image: string;
  score: string;
  description: string;
  time: string;
}

export const MovieInfo:React.FC<IMovieInfoProps> =({
  id,
  title,
  year,
  genres,
  image,
  description,
  score,
  time,
})=>{

  return (
    <div className={styles.conteiner}>
      <img src={image} alt='movie poster' />
      <div className={styles.infoContent}>
        <div className={styles.titleConteiner}>
          <div className={styles.titleContent}>
            <p className={styles.title}>{title}</p>
            <div className={styles.score}>{score}</div>
          </div>
          <p className={styles.genre}>{genres.join(', ')}</p>
        </div>
        <div className={styles.yearConteiner}>
          <p>{year}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
