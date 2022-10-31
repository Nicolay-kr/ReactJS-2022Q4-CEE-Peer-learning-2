import * as React from 'react';
// import styles from '../styles/MovieInfo.module.css';
import styles from '../styles/MovieInfo.module.css';
import burger from '../assets/images/burger.svg';
import cross from '../assets/images/cross.svg';

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

export function MovieInfo({
  id,
  title,
  year,
  genres,
  image,
  description,
  score,
  time,
}: IMovieInfoProps): JSX.Element {
  const [burgerMenuIsOpen, setIsBurgerMenuIsOpen] = React.useState(false);

  const handleClickBurgerOpen = () => {
    setIsBurgerMenuIsOpen(true);
  };

  const handleClickBurgerClose = () => {
    setIsBurgerMenuIsOpen(false);
  };

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
