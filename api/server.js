const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.get('/data', (req, res) => {
  const results = [];

  fs.createReadStream('spotify_songs.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.json(results));
});

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


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
