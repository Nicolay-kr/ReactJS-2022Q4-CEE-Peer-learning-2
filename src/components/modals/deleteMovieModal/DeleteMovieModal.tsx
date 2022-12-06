import * as React from 'react';
import styles from './DeleteMovieModal.module.css';
import cross from '../../../assets/images/cross.svg';
import { Overlay } from '../../Overlay/Overlay';
import { useAppDispatch } from '../../../app/hooks';
import { removeMovieByIdAsync } from '../../../app/moviesSlice';

interface IDeleteMovieModalProps {
  id:number|string
  onClose?: () => void;
}

const DeleteMovieModal: React.FunctionComponent<IDeleteMovieModalProps> = ({
  onClose,id
}) => {
  // const [isGenreListOpen, setIsGenreListOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  const handleConfirm = () => {
    dispatch(removeMovieByIdAsync(id))
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
