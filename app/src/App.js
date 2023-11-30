import './App.css';
import React from 'react';
import MostPopularSongs from './components/MostPopularSongs';
import MostPopularGenres from './components/MostPopularGenres';

import MostPopularKeys from './components/MostPopularKeys';
import MostPopularMode from './components/MostPopularMode';

function App() {
  return (
    
    <div>
      <h1 className='Titulo'>Improgress Test: 30,000 Spotify songs</h1>
      <MostPopularSongs />
      <MostPopularGenres />
      <MostPopularKeys />
      <MostPopularMode />
    </div>
  );
}

export default App;
