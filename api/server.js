const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// GET devuelve toda la data de las canciones
app.get('/data', (req, res) => {
  const results = [];

  fs.createReadStream('spotify_songs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.json(results));
});

// GET devuelve las 10 canciones más populares
app.get('/most_popular_songs', (req, res) => {
  const results = [];

  fs.createReadStream('spotify_songs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.sort((a, b) => b.track_popularity - a.track_popularity);
      
      const uniqueResults = [];
      const uniqueTrackNames = new Set();

      for (const result of results) {
        if (!uniqueTrackNames.has(result.track_name)) {
          uniqueResults.push(result);
          uniqueTrackNames.add(result.track_name);
        }
      }
      const top10Results = uniqueResults.slice(0, 10);

      res.json(top10Results);

    });
});

// GET devuelve los géneros en orden de popularidad
app.get('/most_popular_genres', (req, res) => {
  const results = [];

  fs.createReadStream('spotify_songs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

      const genreStats = {};

      results.forEach((song) => {
        const genre = song.playlist_genre;
        const popularity = parseInt(song.track_popularity);

        if (!isNaN(popularity)) {
          if (!genreStats[genre]) {
            genreStats[genre] = { sum: popularity, count: 1 };
          } else {
            genreStats[genre].sum += popularity;
            genreStats[genre].count += 1;
          }
        }
      });      

      const averageGenres = Object.keys(genreStats).map((genre) => ({
        genre: genre,
        averagePopularity: genreStats[genre].sum / genreStats[genre].count,
      }));

      averageGenres.sort((a, b) => b.averagePopularity - a.averagePopularity);

      res.json(averageGenres);

    });
});

// GET devuelve las claves en orden de popularidad
app.get('/most_popular_keys', (req, res) => {
  const results = [];

  fs.createReadStream('spotify_songs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

      const keyStats = {};

      results.forEach((song) => {
        const key = song.key;
        const popularity = parseInt(song.track_popularity);

        if (!keyStats[key]) {
          keyStats[key] = { sum: popularity, count: 1 };
        } else {
          keyStats[key].sum += popularity;
          keyStats[key].count += 1;
        }
        
        }
      );      

      const averageKeys = Object.keys(keyStats).map((key) => ({
        key: key,
        averagePopularity: keyStats[key].sum / keyStats[key].count,
      }));

      averageKeys.sort((a, b) => b.averagePopularity - a.averagePopularity);

      res.json(averageKeys);

    });
});

// GET devuelve los modos en orden de popularidad
app.get('/most_popular_mode', (req, res) => {
  const results = [];

  fs.createReadStream('spotify_songs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

      const modeStats = {};

      results.forEach((song) => {
        const mode = song.mode;
        const popularity = parseInt(song.track_popularity);

        if (!modeStats[mode]) {
          modeStats[mode] = { sum: popularity, count: 1 };
        } else {
          modeStats[mode].sum += popularity;
          modeStats[mode].count += 1;
        }
        
        }
      );      

      const averageModes = Object.keys(modeStats).map((mode) => ({
        mode: mode,
        averagePopularity: modeStats[mode].sum / modeStats[mode].count,
      }));
      
      averageModes.forEach(function(objeto) {
        if (objeto.mode === "1") {
          objeto.mode = "Major";
        } else if (objeto.mode === "0") {
          objeto.mode = "Minor";
        }
      });
      
      averageModes.sort((a, b) => b.averagePopularity - a.averagePopularity);

      res.json(averageModes);

    });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
