import * as React from 'react';
import styles from '../styles/MovieCard.module.css';
import burger from '../assets/images/burger.svg';
import cross from '../assets/images/cross.svg';

export interface IMovieCardProps {
  id: number;
  title: string;
  year: string;
  genres: string[];
  image: string;
}

export function MovieCard({
  id,
  title,
  year,
  genres,
  image,
}: IMovieCardProps): JSX.Element {
  const [burgerMenuIsOpen, setIsBurgerMenuIsOpen] = React.useState(false);

  const handleClickBurgerOpen = () => {
    setIsBurgerMenuIsOpen(true);
  };

  const handleClickBurgerClose = () => {
    setIsBurgerMenuIsOpen(false);
  };

  return (
    <div className={styles.conteiner}>
      <img
        className={styles.burger}
        src={burger}
        alt='burger icon'
        onClick={handleClickBurgerOpen}
      />
      {burgerMenuIsOpen ? (
        <div className={styles.burgerMenu}>
          <img
            className={styles.burger}
            src={cross}
            alt='cross icon'
            onClick={handleClickBurgerClose}
          />
          <p>Edit</p>
          <p>Delete</p>
        </div>
      ) : null}
      <img src={image} alt='movie poster' />
      <div className={styles.titleConteiner}>
        <p className={styles.title}>{title}</p>
        <div className={styles.year}>{year}</div>
      </div>
      <p className={styles.genres}>{genres.join(', ')}</p>
    </div>
  );
}
