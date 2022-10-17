import React from 'react';
import styles from '../styles/GenreToggle.module.css';

class GenreToggle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeGenre: 0, activeGenreElement: null };
    this.genresRef = React.createRef();
    this.setActiveGenre = this.setActiveGenre.bind(this);
  }
  componentDidMount() {
    this.setState((state) => ({
      activeGenreElement:
        this.genresRef.current.children[
          this.state.activeGenre
        ].getBoundingClientRect(),
    }));
  }

  setActiveGenre(e) {
    const id = e.target.id;
    this.setState((state) => ({
      activeGenre: id,
      activeGenreElement:
        this.genresRef.current.children[id].getBoundingClientRect(),
    }));
  }

  render() {
    const genres = this.props.genres;
    const activeGenreElement = this.state.activeGenreElement;

    return (
      <div className={styles.conteiner}>
        <h1 className={styles.taskTitle}>
          3. GenreToggle with React.PureComponent
        </h1>

        <div className={styles.content}>
          <div className={styles.firstRow}>
            <div className={styles.genres} ref={this.genresRef}>
              {genres.map((gener, index) => (
                <span id={index} key={gener} onClick={this.setActiveGenre}>
                  {gener}
                </span>
              ))}
            </div>

            <div className={styles.ordering}>
              <span>Sort by</span>
              <span>release date</span>
            </div>
          </div>

          <div className={styles.secondRow}>
            <div
              className={styles.activeLine}
              style={{
                position:'absolute',
                width: activeGenreElement
                  ? `${activeGenreElement.width}px`
                  : '100px',
                left: activeGenreElement
                  ? `${activeGenreElement.x-100}px`
                  : '100px',
              }}
            ></div>
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
