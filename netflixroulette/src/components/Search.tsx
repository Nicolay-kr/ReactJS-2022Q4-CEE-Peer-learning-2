import React from 'react';
// import styles from '../styles/Search.module.css';
import styles from '../styles/Search.module.css';
import bitmap from '../assets/images/bitmap.png'

export default function Search() {
  const [value, setValue] = React.useState('');
  const handleChange = (event:any) => {

    setValue(event.target.value);
  };

  return (
    <header className={styles.conteiner} style={{backgroundImage: `url(${bitmap})`}}>
      <div className={styles.content}>

      
      <div className={styles.contentAddMivieButton}>
        <span className={styles.name}><strong>netflix</strong>roulette</span>
        <button className={styles.addMivieButton}>+ add movie</button>

      </div>
      <div className={styles.searchFormConteiner}>
        <h2 className={styles.title}>FIND YOUR MOVIE</h2>
        <div className={styles.formConteiner}>
          <input
            type='search'
            name='search'
            placeholder='What do you want to watch?'
            className={styles.inputField}
            value={value}
            onChange={handleChange}
          ></input>
          <button className={styles.button}>Search</button>
        </div>
      </div>
      </div>
    </header>
  );
}
