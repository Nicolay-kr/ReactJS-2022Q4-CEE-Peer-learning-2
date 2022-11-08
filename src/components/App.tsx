import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import { Footer } from './Footer';
import ErrorBoundary from './ErrorBoundary';
import MovieModal from './modals/MovieModal/MovieModal';
// import MovieModal from '../components/modals/MovieModal';

function App(): JSX.Element {
  const [isMovieModalopen, setIsMovieModalopen] = useState<boolean>(false);
  const [movie, setMovie] = useState<string|null>(null);
  const [mode, setMode] = useState<any>(null);
  // const [isMovieModalopen, setIsMovieModalopen] = useState<boolean>(false);

  const openMovieModal = (mode:string='add', movie=null) => {
    if(mode==='edit'|| mode==='delete' ){
      setMode(mode);
      setMovie(movie)
    }else{
      setMode(mode);
    }
    setIsMovieModalopen(true)
  }
  const closeMovieModal = () => {
    setIsMovieModalopen(false)
  }


  return (
    <ErrorBoundary>
      <div className='App'>
        <HomePage onOpenMovieModal={openMovieModal} ></HomePage>
        <Footer></Footer>
      </div>
      {isMovieModalopen?<MovieModal onClose={closeMovieModal} movie={movie} mode={mode}></MovieModal>:null}
      {/* {isEditMovieModalopen?<MovieModal onClose={closeEditMovieModal}></MovieModal>:null} */}
    </ErrorBoundary>
  );
}

export default App;
