import React from 'react';
import './styles/App.css';
import GenreToggle from './components/GenreToggle';
import Search from './components/Search';
import { Footer } from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary ';

function App(): JSX.Element {
  return (
    <div className='App'>
      <ErrorBoundary>
        <Search></Search>
        <GenreToggle></GenreToggle>
        <Footer></Footer>
      </ErrorBoundary>
    </div>
  );
}

export default App;
