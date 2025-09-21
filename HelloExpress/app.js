// HelloExpress/app.js

const express = require('express');
//const bodyparser = require('body-parser');
const app = express();
const PORT = 5000;


// to use body-parser middleware
//app.use(bodyparser.json());

// built-in middleware to parse JSON bodies
app.use(express.json());

app.get('/api/hello',(req,res)=>{
    res.send('Hello from Yesha! Welcome to express server. which automatically restarts on code changes.');
})

app.get('/api/movies',(req,res)=>{
    console.log(req.query);
    console.log(req.query.sort);
    res.send('All movies will be listed here.');
})
// localhost:5000/movies/genre/year/name
app.get('/api/movies/:genre/:year/:name',(req,res)=>{
    console.log(req.params);
    console.log(req.params.genre);
    res.send('All comedy movies will be listed here.');
})

// get request to fetch all action movies
app.get('/api/movies/action',(req,res)=>{
    let movies = [
        {name:'Inception',director:'Christopher Nolan',year:2010},
        {name:'The Dark Knight',director:'Christopher Nolan',year:2008},
        {name:'Avengers: Endgame',director:'Anthony and Joe Russo',year:2019},
        {name:'Mad Max: Fury Road',director:'George Miller',year:2015}
    ];
    res.json(movies);
}
)
// Handle POST request at /api/movies/action
app.post('/api/movies/action', (req, res) => {

  // Pull "name", "director", and "year" from the request body (sent by React form)
  let { name, director, year } = req.body || {};

  // Convert year to a number (form inputs come as strings)
  year = parseInt(year, 10);

  // Check if values are missing or year is not a valid number
  if (!name || !director || Number.isNaN(year)) {
    // If bad data → send 400 (bad request) and a JSON error message
    return res.status(400).json({
      message: 'Invalid payload. Expect { name, director, year:number }'
    });
  }

  // Print the data to the server console (for debugging)
  console.log('Received:', { name, director, year });

  // Send a success response back as JSON with status 201 (created)
  return res.status(201).json({
    message: 'Created',
    movie: { name, director, year } // echo back the movie data
  });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})