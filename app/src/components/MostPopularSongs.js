import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './components.css';

const MostPopularSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/most_popular_songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: songs.map(song => song.track_name),
    datasets: [{
      label: 'Popularidad',
      data: songs.map(song => song.track_popularity),
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,

    }],
  };

  return (
    <div>
      <h1>Top 10 Canciones Más Populares</h1>
      <div className='elements_container'>
        <div className='tabla_container'>
          <h2>Tabla</h2>
          <div className='tabla'>
            <table>
              <thead>
                <tr>
                  <th>Canción</th>
                  <th>Artista</th>
                  <th>Álbum</th>
                  <th>Género</th>
                  <th>Popularidad</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <tr key={index}>
                    <td>{song.track_name}</td>
                    <td>{song.track_artist}</td>
                    <td>{song.track_album_name}</td>
                    <td>{song.playlist_genre}</td>
                    <td>{song.track_popularity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className='graph_container'>
          <h2>Gráfico de Barras</h2>
          <div className='bar_graph'>
            <Bar
              data={data}
              options={{
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 95,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}

export default MostPopularSongs;
