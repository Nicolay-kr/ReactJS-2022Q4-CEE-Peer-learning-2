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
  click: any;
  description: string;
  score: string;
  time: string;
  onOpenMovieModal: (mode: string, movie: any) => void;
  openDeleteMovieModal: (id:string|number) => void;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
  id,
  title,
  year,
  genres,
  image,
  click,
  score,
  time,
  description,
  onOpenMovieModal,
  openDeleteMovieModal,
}) => {
  const [burgerMenuIsOpen, setIsBurgerMenuIsOpen] = React.useState(false);

  const movie = { id, title, year, genres, image, click, time, score, description };

  const handleClickBurgerOpen = () => {
    setIsBurgerMenuIsOpen(true);
  };

  const handleClickBurgerClose = () => {
    setIsBurgerMenuIsOpen(false);
  };

  const handleClick = () => {
    click(id);
  };

  const handleEditMovieClick = () => {
    if(movie){
      onOpenMovieModal('edit', movie);
    }
  };
  const handleDeleteMovieClick = () => {
    if(movie){
      openDeleteMovieModal(id);
    }
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
          <p onClick={handleEditMovieClick}>Edit</p>
          <p onClick={handleDeleteMovieClick}>Delete</p>
        </div>
      ) : null}
      <div className={styles.content} onClick={handleClick}>
        <img src={image} alt='movie poster' />
        <div className={styles.titleConteiner}>
          <p className={styles.title}>{title}</p>
          <div className={styles.year}>{year}</div>
        </div>
        <p className={styles.genres}>{genres.join(', ')}</p>
      </div>
    </div>
  );
};
