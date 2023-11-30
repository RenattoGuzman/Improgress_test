import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './components.css';

const MostPopularMode = () => {
  const [mode, setMode] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/most_popular_mode')
      .then(response => setMode(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const data = {
    labels: mode.map(song => song.mode),
    datasets: [{
      label: 'Popularidad',
      data: mode.map(song => song.averagePopularity),
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,

    }],
  };

  return (
    <div>
      <h1>Modo Musical Más Populares</h1>
      <div className='elements_container'>
        <div className='tabla_container'>
          <h2>Tabla</h2>
          <div className='tabla'>
            <table>
              <thead>
                <tr>
                  <th>Modo</th>
                  <th>Popularidad</th>
                </tr>
              </thead>
              <tbody>
                {mode.map((song, index) => (
                  <tr key={index}>
                    <td>{song.mode}</td>
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
                    min: 40,
                    max: 45,
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

export default MostPopularMode;
