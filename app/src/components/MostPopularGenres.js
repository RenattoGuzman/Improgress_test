import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './components.css';

const MostPopularGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/most_popular_genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: genres.map(song => song.genre),
    datasets: [{
      label: 'Popularidad',
      data: genres.map(song => song.averagePopularity),
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,

    }],
  };

  return (
    <div>
      <h1>Géneros Musicales Más Populares</h1>
      <div className='elements_container'>
        <div className='tabla_container'>
          <h2>Tabla</h2>
          <div className='tabla'>
            <table>
              <thead>
                <tr>
                  <th>Género</th>
                  <th>Popularidad</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((song, index) => (
                  <tr key={index}>
                    <td>{song.genre}</td>
                    <td>{song.averagePopularity}</td>
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
                    min: 30,
                    max: 50,
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

export default MostPopularGenres;
