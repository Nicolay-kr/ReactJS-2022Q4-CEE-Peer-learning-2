import * as React from 'react';
import styles from './DeleteMovieModal.module.css';
import cross from '../../../assets/images/cross.svg';
import { Overlay } from '../../Overlay/Overlay';

interface IDeleteMovieModalProps {
  onClose?: () => void;
}

const DeleteMovieModal: React.FunctionComponent<IDeleteMovieModalProps> = ({
  onClose,
}) => {
  // const [isGenreListOpen, setIsGenreListOpen] = React.useState(false);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  const handleConfirm = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Overlay>
      <div className={styles.conteiner}>
        <img
          style={{ marginLeft: 'auto', width: '20px', cursor: 'pointer' }}
          src={cross}
          alt='cross'
          onClick={handleCloseModal}
        />
        <h2 className={styles.title}>Delete MOVIE</h2>
        <p className={styles.subtitle}>
          Are you sure you want to delete this movie?
        </p>
        <input
          className={styles.submitBtn}
          onClick={handleConfirm}
          type='button'
          value='confirm'
        />
      </div>
    </Overlay>
  );
};

export default DeleteMovieModal;
