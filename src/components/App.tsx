import React from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import { Footer } from './Footer';
import ErrorBoundary from './ErrorBoundary';

function App(): JSX.Element {
  return (
    <div className='App'>
      <ErrorBoundary>
        <HomePage></HomePage>
        <Footer></Footer>
      </ErrorBoundary>
    </div>
  );
}

export default App;
