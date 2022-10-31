import React from 'react';
import './styles/App.css';
import GenreToggle from './components/GenreToggle';
import Search from './components/Search';
import { Footer } from './components/Footer';

function App(): JSX.Element {
  return (
    <div className='App'>
      <Search></Search>
      <GenreToggle></GenreToggle>
      <Footer></Footer>
    </div>
  );
}

export default App;
