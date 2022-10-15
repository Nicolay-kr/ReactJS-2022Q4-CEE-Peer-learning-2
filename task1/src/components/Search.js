import React from 'react';
import styles from '../styles/Search.module.css';

export default function IntroBlock() {
  const [value, setValue] = React.useState('What do you want to watch?');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1 className={styles.taskTitle}>2. Search Field with Functional component</h1>
      <div className={styles.conteiner}>
        <h2 className={styles.title}>FIND YOUR MOVIE</h2>
        <div className={styles.formConteiner}>
          <input
            type='search'
            name='search'
            className={styles.inputField}
            value={value}
            onChange={handleChange}
          ></input>
          <button className={styles.button}>Search</button>
        </div>
      </div>
    </div>
  );
}
