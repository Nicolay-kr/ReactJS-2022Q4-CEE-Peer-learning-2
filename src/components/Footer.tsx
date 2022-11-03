import * as React from 'react';
import styles from '../styles/Footer.module.css';

export const Footer:React.FC = () => {
  return (
    <div className={styles.conteiner}>
      <span className={styles.name}><strong>netflix</strong>roulette</span>
    </div>
  );
}
