import React, { useState, useEffect } from "react";
import axios from "axios";

import dummyMovies from "./dummyMovies";
import background1 from './images/image1.jpg'
import background2 from './images/image2.jpg'
import background3 from './images/image3.jpg'
import background4 from './images/image4.jpg'
import background5 from './images/image5.jpg'
import background6 from './images/image6.jpg'
import background7 from './images/image7.jpg'
import background8 from './images/image8.jpg'
import background9 from './images/image9.jpg'
const MovieApp = () => {
  const [movies, setMovies] = useState(dummyMovies);
  const [filterDate, setFilterDate] = useState("");
  const [filterDate1, setFilterDate1] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const backgroundImages = [background1,background2,background3,background4,background5,background6,background7,background8,background9 ]
  const [hide, setHide] = useState(Array(dummyMovies.length).fill(false));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://movies-api14.p.rapidapi.com/movies-api14/movies",
          {
            headers: {
              "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
              "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
            },
          }
        );
        //  setMovies(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    if (filterDate) {
      if (filterDate1) {
        const filterMoviesByDate = () => {
          const filteredMovies = dummyMovies.filter((movie) => {
            const movieReleaseDate = new Date(movie.released_date);
            return (
              movieReleaseDate >= new Date(filterDate) &&
              movieReleaseDate <= new Date(filterDate1)
            );
          });

          setMovies(filteredMovies);
        };
        filterMoviesByDate();
      }
    }
    // Implement filtering logic based on filterDate
    // Update the movies state with the filtered result
  };

  const handleSearch = () => {
    const searchMovies = () => {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setMovies(filteredMovies);
    };
    searchMovies();
  };
  const handleMovieClick = (value) => {
    setHide((prevHide) => {
      const newHide = [...prevHide];
      newHide[value - 1] = !newHide[value - 1];
      return newHide;
    });
  };
  
  return (
    <div>
      <h1>Movies App</h1>

      {/* Filter by Released Date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          margin:"1%"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            width: "45%",
          }}
        >
          From{" "}
          <input
            style={{ width: "35%", padding: "5px" }}
            type="Date"
            placeholder="From Data"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          To{" "}
          <input
            type="Date"
            style={{ width: "35%", padding: "5px" }}
            placeholder="To Date"
            value={filterDate1}
            onChange={(e) => setFilterDate1(e.target.value)}
          />
          <button onClick={handleFilter} style={{ width: "10%" }}>
            Submit
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            width: "30%",
          }}
        >
          <input
            style={{ width: "70%" }}
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Display Movies */}
      <div  className="card">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "90%",
            flexDirection:"row",
            margin: "auto",
          }}
          className="card"
        >
          {movies.map((movie,index) => (
            
            <div className="card"
              key={movie.id}
              style={{
                width: "300px",
                height: "500px",
                margin:"4%"             
              }}
            >
             <div
      style={{
        backgroundImage: `url(${backgroundImages[index % backgroundImages.length]})`, // Select background image based on index
        width: "300px",
        height: "300px"
      }}
    ></div>
              <p>{movie.title}</p>
              {/* Display genres as tags */}
              <div style={{ margin: "0px" }}>
                {movie.genres.map((genre) => (
                  <span key={genre} style={{ padding: "3px" }}>
                    {genre}
                  </span>
                ))}
              </div>
              {/* Modal to show individual movie */}
              <div style={{ padding: "3px" }}>{movie.released_date}</div>
              {hide[movie.id - 1] === true && <div>{movie.details}</div>}
              <button onClick={() => handleMovieClick(movie.id)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Movie Modal */}
  

      {/* Implement a modal component to display individual movie details and trailer */}
    </div>
  );
};

export default MovieApp;
