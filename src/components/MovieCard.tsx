import * as React from 'react';
import styles from '../styles/MovieCard.module.css';
import burger from '../assets/images/burger.svg';
import cross from '../assets/images/cross.svg';
import { Movie } from '../types/movie';
import { Modal } from './ReactPortal';
import DeleteMovieModal from './modals/deleteMovieModal/DeleteMovieModal';
import MovieModal from './modals/MovieModal/MovieModal';

export interface IMovieCardProps extends Movie {
  click: any;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
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
  click,
}) => {
  const [burgerMenuIsOpen, setIsBurgerMenuIsOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isMovieAddModalopen, setIsMovieAddModalopen] =
    React.useState<boolean>(false);

  const movie = {
    id,
    title,
    release_date,
    genres,
    poster_path,
    click,
    runtime,
    vote_average,
    overview,
  };

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
    if (movie) {
      setIsMovieAddModalopen(true);
    }
    handleClickBurgerClose();
  };
  const handleDeleteMovieClick = () => {
    setShowModal(true);
    handleClickBurgerClose();
  };

  return (
    <>
      {showModal && (
        <Modal>
          <DeleteMovieModal
            id={id}
            onClose={() => setShowModal(false)}
          ></DeleteMovieModal>
        </Modal>
      )}
      {isMovieAddModalopen && (
        <Modal>
          <MovieModal
            movie={movie}
            mode='edit'
            onClose={() => setIsMovieAddModalopen(false)}
          ></MovieModal>
        </Modal>
      )}
      <div className={styles.conteiner} key={id}>
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
          <img
            style={{ width: '100%', height: '490px' }}
            src={poster_path}
            alt='movie poster'
          />
          <div className={styles.titleConteiner}>
            <p className={styles.title}>{title}</p>
            <div className={styles.year}>{`${release_date}`.slice(0, 4)}</div>
          </div>
          <p className={styles.genres}>{genres.join(', ')}</p>
        </div>
      </div>
    </>
  );
};
