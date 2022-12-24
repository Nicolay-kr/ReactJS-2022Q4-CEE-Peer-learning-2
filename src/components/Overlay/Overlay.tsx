import React, { useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import style from './Overlay.module.css'

export const Overlay: FC<PropsWithChildren> = ({ children = '' }) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if(body){
      body.style.overflow = 'hidden';

      return () => {
        body.style.overflow = 'auto';
      };
    }
  }, []);

  return (
    <div className={style.conteiner}>{children}</div>
  );
}