const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const PORT = 5000;


// to use body-parser middleware
app.use(bodyparser.json());

app.get('/hello',(req,res)=>{
    res.send('Hello from Yesha! Welcome to express server. which automatically restarts on code changes.');
})

app.get('/movies',(req,res)=>{
    console.log(req.query);
    console.log(req.query.sort);
    res.send('All movies will be listed here.');
})
// localhost:5000/movies/genre/year/name
app.get('/movies/:genre/:year/:name',(req,res)=>{
    console.log(req.params);
    console.log(req.params.genre);
    res.send('All comedy movies will be listed here.');
})

// get request to fetch all action movies
app.get('/movies/action',(req,res)=>{
    let movies = [
        {name:'Inception',director:'Christopher Nolan',year:2010},
        {name:'The Dark Knight',director:'Christopher Nolan',year:2008},
        {name:'Avengers: Endgame',director:'Anthony and Joe Russo',year:2019},
        {name:'Mad Max: Fury Road',director:'George Miller',year:2015}
    ];
    res.json(movies);
}
)

// post request to add a new action movie
app.post('/movies/action',(req,res)=>{
    let name = req.body.name;
    let director = req.body.director;
    let year = req.body.year;
    console.log(name,director,year);
    console.log(req.body);
    
    res.send('OK! A new action movie will be added here.\nName: '+name+'\nDirector: '+director+'\nYear: '+year);
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})