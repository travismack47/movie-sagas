const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // GET request/pool query to retrieve movies from database
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    });

});
// GET request/pool query to retrieve specific movie details based on ID number
router.get('/details/:id', (req, res) => {
  const poolQuery = // JOIN query to merge data together from different tables
    `SELECT m.title, m.poster, m.description, 
     STRING_AGG(g.name, ', ') AS genres
     FROM movies AS m
     LEFT JOIN movies_genres AS mg ON m.id = mg.movie_id
     LEFT JOIN genres AS g ON mg.genre_id = g.id
     WHERE m.id = $1
     GROUP BY m.title, m.poster, m.description;`;
  pool.query(poolQuery, [req.params.id])
    .then(result => {
      res.send(result.rows[0]); // Sends first result back to the client 
    })
    .catch(error => {
      console.log('Error getting details', error);
      res.sendStatus(500);
    });
});
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      });

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  });
});

module.exports = router;