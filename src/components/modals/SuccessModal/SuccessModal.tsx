import * as React from 'react';
import styles from './SuccessModal.module.css';
import cross from '../../../assets/images/cross.svg';
import success from '../../../assets/images/success.svg';
import { Overlay } from '../../Overlay/Overlay';

interface ISuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FunctionComponent<ISuccessModalProps> = ({
  onClose,
}) => {
  const handleSuccessCloseModal = () => {
    onClose();
  };

  return (
    <Overlay>
      <div className={styles.conteiner}>
        <img
          style={{ marginLeft: 'auto', width: '20px', cursor: 'pointer' }}
          src={cross}
          alt='cross'
          onClick={handleSuccessCloseModal}
        />
          <img
          style={{ margin: 'auto', width: '60px',  }}
          src={success}
          alt='success'
        />
        <h2 className={styles.title}>congratulations !</h2>
        <p className={styles.subtitle}>
          The movie has been added to database successfully
        </p>
        {/* <input
          className={styles.submitBtn}
          onClick={handleConfirm}
          type='button'
          value='confirm'
        /> */}
      </div>
    </Overlay>
  );
};

export default SuccessModal;
