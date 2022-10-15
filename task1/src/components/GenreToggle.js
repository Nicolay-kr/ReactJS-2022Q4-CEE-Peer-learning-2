import React from 'react';
import styles from '../styles/GenreToggle.module.css';

class GenreToggle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  addOne() {
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  }

  removeOne() {
    this.setState((state) => ({
      counter: state.counter - 1,
    }));
  }

  render() {
    return (
      <div className={styles.conteiner}>
        <h1 className={styles.taskTitle}>3. GenreToggle with React.PureComponent</h1>
        <div className={styles.content}>
          <div className={styles.firstRow}>
            <span>all</span>
            <span>Documentary</span>
            <span>Comedy</span>
            <span>Horror</span>
            <span>crime</span>

            <span>Sort by</span>
            <span>release date</span>
          </div>
          <div className={styles.secondRow}>
            <div className={styles.line}>
              <span className={styles.firstline}></span>
              <span className={styles.secondline}></span>
              <span className={styles.thirdLine}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenreToggle;
