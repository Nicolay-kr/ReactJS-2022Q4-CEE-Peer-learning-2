import React from 'react';
import './styles/App.css';
import HomePage from './components/HomePage';
import Search from './components/Search';
import { Footer } from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary ';

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
