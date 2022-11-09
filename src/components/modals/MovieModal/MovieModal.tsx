import * as React from 'react';
import styles from './MovieModal.module.css';
import arrow from '../../../assets/images/arrow.svg';
import cross from '../../../assets/images/cross.svg';
import { Overlay } from '../../Overlay/Overlay';
import SuccessModal from '../SuccessModal/SuccessModal';

interface IAddMovieFormProps {
  onClose?: () => void;
  movie: any;
  mode: string;
}

const MovieModal: React.FunctionComponent<IAddMovieFormProps> = ({
  onClose,
  movie,
  mode,
}) => {
  const defaultFormState = {
    title: '',
    realiseDate: '',
    movieUrl: '',
    rating: '',
    genre: 'Select Genre',
    runtime: '',
    overview: '',
  };

  const editFormState = {
    title: movie?.title ? movie.title : '',
    realiseDate: movie?.year ? movie.year : '',
    movieUrl: '',
    rating: movie?.score ? movie.score : '',
    genre: 'Select Genre',
    runtime: movie?.time ? movie.time : '',
    overview: movie?.description ? movie.description : '',
  };
  const genres = ['Documentary', 'Comedy', 'Horror', 'crime'];
  const [formState, setFormState] = React.useState(
    mode === 'add' ? defaultFormState : editFormState
  );
  const [isGenreListOpen, setIsGenreListOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const handleChangeTitle = (e) => {
    setFormState((state) => ({ ...state, title: e.target.value }));
  };
  const handleChangeRealiseDate = (e) => {
    setFormState((state) => ({ ...state, realiseDate: e.target.value }));
  };
  const handleChangeUrl = (e) => {
    setFormState((state) => ({ ...state, movieUrl: e.target.value }));
  };
  const handleChangeRating = (e) => {
    setFormState((state) => ({ ...state, rating: e.target.value }));
  };
  const handleChangeRuntime = (e) => {
    setFormState((state) => ({ ...state, runtime: e.target.value }));
  };
  const handleChangeGenre = (e) => {
    setFormState((state) => ({ ...state, genre: e.target.value }));
  };
  const handleChangeOverview = (e) => {
    setFormState((state) => ({ ...state, overview: e.target.value }));
  };

  const handleReset = () => {
    setFormState(defaultFormState);
  };

  const handleClickGenresList = (e) => {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    setIsGenreListOpen(!isGenreListOpen);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSuccessCloseModal = () => {
    setIsSuccessModalOpen(false)
    handleCloseModal()
  };
  const handleSuccessOpenModal = () => {
    setIsSuccessModalOpen(true)
  };

  return (
    <Overlay>
      {isSuccessModalOpen && mode==='add' ? (
        <SuccessModal onClose={handleSuccessCloseModal} />
      ) : (
        <div className={styles.formConteiner}>
          <img
            style={{ marginLeft: 'auto', width: '20px', cursor: 'pointer' }}
            src={cross}
            alt='cross'
            onClick={handleCloseModal}
          />
          <h2 className={styles.title}>
            {mode === 'edit' ? 'EDIT MOVIE' : 'ADD MOVIE'}
          </h2>
          <form className={styles.form} action='page.html' method='post'>
            <label>
              TITLE
              <input
                type='text'
                name='title'
                value={formState.title}
                onChange={handleChangeTitle}
                placeholder='Enter a title'
              />
            </label>
            <label>
              RELEASE DATE
              <input
                type='date'
                name='release'
                value={formState.realiseDate}
                onChange={handleChangeRealiseDate}
                placeholder='Select Date'
              />
            </label>
            <label>
              movie url
              <input
                type='url'
                name='url'
                value={formState.movieUrl}
                onChange={handleChangeUrl}
                placeholder='https://'
              />
            </label>
            <label>
              RATING
              <input
                type='text'
                name='rating'
                value={formState.rating}
                onChange={handleChangeRating}
                placeholder='7.8'
              />
            </label>
            <label className={styles.selectListConteiner}>
              genre
              {/* <SelectList></SelectList> */}
              <div
                className={styles.selectList}
                // onChange={handleChangeGenre}
              >
                {formState.genre}
                <img
                  style={{
                    transform: isGenreListOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                  src={arrow}
                  alt='arrow'
                  onClick={handleClickGenresList}
                />
              </div>
              {isGenreListOpen ? (
                <div className={styles.genresConteiner}>
                  {genres?.map((genre) => (
                    <label key={genre}>
                      {genre}
                      <input type='checkbox' value={genre} />
                    </label>
                  ))}
                </div>
              ) : null}
            </label>
            <label>
              RUNTIME
              <input
                type='text'
                name='runtime'
                value={formState.runtime}
                onChange={handleChangeRuntime}
                placeholder='minutes'
              />
            </label>
            <label>
              OVERVIEW
              <textarea
                name='overview'
                rows={7}
                value={formState.overview}
                onChange={handleChangeOverview}
                placeholder='Movie description'
              />
            </label>
            <div className={styles.buttonConyeiner}>
              <input
                className={styles.resetBtn}
                type='button'
                value='reset'
                onClick={handleReset}
              />
              <input
                onClick={mode==='add'?handleSuccessOpenModal:handleCloseModal}
                className={styles.submitBtn}
                type='button'
                value='submit'
              />
            </div>
          </form>
        </div>
      )}
    </Overlay>
  );
};

export default MovieModal;
