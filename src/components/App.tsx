import React, { useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import { Footer } from './Footer';
import ErrorBoundary from './ErrorBoundary';
import MovieModal from './modals/MovieModal/MovieModal';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div className='App'>
        <HomePage></HomePage>
        <Footer></Footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
