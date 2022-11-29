import * as React from 'react';
import styles from '../styles/MovieInfo.module.css';
import {Movie} from '../types/movie'

export interface IMovieInfoProps extends Movie {
}

export const MovieInfo:React.FC<IMovieInfoProps> =({
  id,
  title,
  tagline,
  vote_average,
  vote_count,
  release_date,
  poster_path,
  overview,
  budget,
  revenue,
  genres,
  runtime,
})=>{

  return (
    <div className={styles.conteiner}>
      <img style={{width:'100%',height:'490px',objectFit:'cover'}} src={poster_path} alt='movie poster' />
      <div className={styles.infoContent}>
        <div className={styles.titleConteiner}>
          <div className={styles.titleContent}>
            <p className={styles.title}>{title}</p>
            <div className={styles.rating}>{vote_average}</div>
          </div>
          <p className={styles.genre}>{genres.join(', ')}</p>
        </div>
        <div className={styles.yearConteiner}>
          <p>{release_date}</p>
          <p className={styles.time}>{runtime}</p>
        </div>
        <p className={styles.description}>{overview}</p>
      </div>
    </div>
  );
}
