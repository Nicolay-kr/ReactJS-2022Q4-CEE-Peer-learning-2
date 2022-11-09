import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import { Footer } from './Footer';
import ErrorBoundary from './ErrorBoundary';
import MovieModal from './modals/MovieModal/MovieModal';
import DeleteMovieModal from './modals/deleteMovieModal/DeleteMovieModal';
// import MovieModal from '../components/modals/MovieModal';

function App(): JSX.Element {
  const [isMovieModalopen, setIsMovieModalopen] = useState<boolean>(false);
  const [movie, setMovie] = useState<string|null>(null);
  const [mode, setMode] = useState<any>(null);
  const [isDeleteMovieModalopen, setIsDeleteMovieModalopen] = useState<boolean>(false);

  const openMovieModal = (mode:string='add', movie=null) => {
    // call api for add/edit movie
    setMovie(movie)
    setMode(mode);
    setIsMovieModalopen(true)
  }
  const closeMovieModal = () => {
    setIsMovieModalopen(false)
  }

  const openDeleteMovieModal = (id:string|number) => {
    // call api for remove movie with id
    console.log(id)
    setIsDeleteMovieModalopen(true)
  }
  const closeDeleteMovieModal = () => {
    setIsDeleteMovieModalopen(false)
  }


  return (
    <ErrorBoundary>
      <div className='App'>
        <HomePage onOpenMovieModal={openMovieModal} openDeleteMovieModal={openDeleteMovieModal}></HomePage>
        <Footer></Footer>
      </div>
      {isMovieModalopen?<MovieModal onClose={closeMovieModal} movie={movie} mode={mode}></MovieModal>:null}
      {isDeleteMovieModalopen?<DeleteMovieModal onClose={closeDeleteMovieModal}></DeleteMovieModal>:null}
    </ErrorBoundary>
  );
}

export default App;
