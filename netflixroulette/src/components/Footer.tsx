import * as React from 'react';
import styles from '../styles/Footer.module.css';

export interface IFooterProps {
}

export function Footer (props: IFooterProps) {
  return (
    <div className={styles.conteiner}>
      <span className={styles.name}><strong>netflix</strong>roulette</span>

    </div>
  );
}
