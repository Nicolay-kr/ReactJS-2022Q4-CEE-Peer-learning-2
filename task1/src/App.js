import './styles/App.css';
import Counter from './components/Counter';
import Search from './components/Search';
import GenreToggle from './components/GenreToggle';

function App() {
  return (
    <div className='App'>
      <Counter></Counter>
      <Search></Search>
      <GenreToggle></GenreToggle>
    </div>
  );
}

export default App;
