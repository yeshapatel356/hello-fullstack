// Import two React hooks: 
// - useState lets us store and update values (like variables that survive re-renders)
// - useEffect lets us run code after the component loads
import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddMovies from "./AddMovies";

// App function is a React component that return JSX to render UI
function App() {

  //hello → starts as empty string "", later will hold the greeting from Express (/api/hello).
  const [hello, setHello] = useState("");
  //movies → starts as empty list [], later will hold the movie objects from Express (/api/movies/action).
  const [movies,setMovies] = useState([]);
  //count → starts at 0, increments by 1 each time the button is clicked.
  const [count, setCount] = useState(0)

  // useEffect runs after the component loads
  useEffect(() =>{

    //define an async function to fetch data from Express
    const load = async () => {
      //try-catch to handle errors
      try{
        // call 2 backend endpoints in parallel
        // - /api/hello returns greeting
        // - /api/movies/action returns movie list json
        const [helloResponse,moviesResponse] = await Promise.all([
          fetch('/api/hello'),
          fetch('/api/movies/action')
        ]);

        // get text from /api/hello response
        const helloText = await helloResponse.text();
        // get json from /api/movies/action response
        const moviesData = await moviesResponse.json();

        // update state with fetched data
        setHello(helloText);
        setMovies(moviesData);

        // log to console for debugging
        console.log(helloText);
        console.log(moviesData);
        console.log(moviesData[0].name); // log name of first movie
      }
      catch(error){
        console.error("Error fetching data:", error);
      }  
    }
    // call the async function to load data
    load();
  },[]); // empty dependency array means this runs once on component mount

  // JSX to render UI
  return (
    <>
      <div>
        
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
       <h1>🎬 Hello Fullstack</h1>


        {/* Show the greeting message from backend */}
      <p style={{ opacity: 0.8 }}>{hello}</p>
      {/* Unordered list of movies */}
      <ul>
        {/* Loop through each movie in "movies" array */}
        {movies.map((m, i) => (
          // Each <li> must have a unique key → here we use the index (i)
          <li key={i}>
            {/* Show movie name in bold, then director and year */}
            <strong>{m.name}</strong> — {m.director} ({m.year})
          </li>
        ))}
      </ul>
      
        <BrowserRouter>
          <nav style={{ marginBottom: 20 }}>
            <Link to="/">Home</Link> | <Link to="/add">Add Movies</Link>
          </nav>
          <Routes>
            <Route path="/" element={<h1>Welcome to Movie App 🎬</h1>} />
            <Route path="/add" element={<AddMovies />} />
          </Routes>
        </BrowserRouter>


      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
     
    </>
  )
}

export default App
