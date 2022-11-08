import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import { Footer } from './Footer';
import ErrorBoundary from './ErrorBoundary';
import AddMovieModal from './modals/AddMovieModal/AddMovieModal';
// import AddMovieModal from '../components/modals/AddMovieModal';

function App(): JSX.Element {
  const [modalParams, setModalParams] = useState<boolean>(false);

  const openAddMovieModal = () => {
    setModalParams(true)
  }
  const closeAddMovieModal = () => {
    setModalParams(false)
  }

  return (
    <ErrorBoundary>
      <div className='App'>
        <HomePage onOpenAddMovieModal={openAddMovieModal} ></HomePage>
        <Footer></Footer>
      </div>
      {modalParams?<AddMovieModal onClose={closeAddMovieModal}></AddMovieModal>:null}
    </ErrorBoundary>
  );
}

export default App;
