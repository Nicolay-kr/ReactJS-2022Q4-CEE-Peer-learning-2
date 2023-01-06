import * as React from 'react';
import styles from './MovieModal.module.css';
import arrow from '../../../assets/images/arrow.svg';
import cross from '../../../assets/images/cross.svg';
import { Overlay } from '../../Overlay/Overlay';
import SuccessModal from '../SuccessModal/SuccessModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { formState } from '../../../types/formState';

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
  const defaultFormState: formState = {
    title: '',
    vote_average: '',
    release_date: '',
    poster_path: '',
    overview: '',
    genres: 'Select Genre',
    runtime: '',
  };

  const editFormState: formState = {
    title: movie?.title ? movie.title : '',
    release_date: movie?.release_date ? movie.release_date : '',
    poster_path: movie?.poster_path ? movie.poster_path : '',
    vote_average: movie?.vote_average ? movie.vote_average : '',
    genres: 'Select Genre',
    runtime: movie?.runtime ? movie.runtime : '',
    overview: movie?.overview ? movie.overview : '',
  };

  const schema = yup
    .object({
      title: yup.string().required('title is a required field'),
      vote_average: yup.number().positive().required('RATING is a required field'),
      release_date: yup.string().required('RELEASE DATE is a required field'),
      poster_path: yup.string().required('url is a required field'),
      overview: yup.string().required('overview is a required field'),
      genres: yup.string().required('genres is a required field'),
      runtime: yup.number().integer().required('runtime is a required field'),
    })
    .required();

  const defaultState = mode === 'add' ? defaultFormState : editFormState;
  const [isGenreListOpen, setIsGenreListOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formState>({
    defaultValues: defaultState,
    resolver: yupResolver(schema)
  });

  const handleClickGenresList = (e) => {
    setIsGenreListOpen(!isGenreListOpen);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSuccessCloseModal = () => {
    setIsSuccessModalOpen(false);
    handleCloseModal();
  };
  const handleSuccessOpenModal = () => {
    setIsSuccessModalOpen(true);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (mode === 'add') {
      handleSuccessOpenModal();
    } else {
      handleCloseModal();
    }
  };

  return (
    <Overlay>
      {isSuccessModalOpen && mode === 'add' ? (
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

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
              TITLE
              <input
                type='text'
                placeholder='Enter a title'
                {...register('title')}
              />
              <p>{errors.title?.message}</p>
            </label>

            <label>
              RELEASE DATE
              <input
                type='date'
                placeholder='Select Date'
                {...register('release_date')}
                />
                <p>{errors.release_date?.message}</p>
            </label>

            <label>
              movie url
              <input
                type='text'
                placeholder='https://'
                {...register('poster_path')}
              />
               <p>{errors.poster_path?.message}</p>
            </label>

            <label>
              RATING
              <input
                type='text'
                placeholder='7.8'
                {...register('vote_average')}
              />
              <p>{errors.vote_average?.message}</p>
            </label>

            <label>
              Genre
              <input type='text' placeholder='genres' {...register('genres')} />
              <p>{errors.genres?.message}</p>
            </label>
            {/* <label className={styles.selectListConteiner}>
              genre
              <div
                className={styles.selectList}
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
            </label> */}

            <label>
              RUNTIME
              <input
                type='text'
                placeholder='minutes'
                {...register('runtime')}
              />
              <p>{errors.runtime?.message}</p>
            </label>

            <label>
              OVERVIEW
              <textarea
                rows={7}
                placeholder='minutes'
                {...register('overview')}
              />
              <p>{errors.overview?.message}</p>
            </label>

            <div className={styles.buttonConyeiner}>
              <input className={styles.resetBtn} type='reset' value='reset' />

              <input
                className={styles.submitBtn}
                type='submit'
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
