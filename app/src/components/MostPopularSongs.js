import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MostPopularSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/most_popular_songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Top 10 Canciones Más Populares</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <strong>{song.track_name}</strong> - {song.artist_name} (Popularidad: {song.track_popularity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostPopularSongs;
