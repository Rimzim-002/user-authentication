import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar"; // Import Navbar
import { getAllMovies } from "../../../Utils/api"; // Fetch movies API
import "../../styles/totalrevenue.css"; // Styling

const TotalRevenue = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      if (response && response.movies) {
        // ✅ Filter out upcoming movies, only show "now playing" movies
        const filteredMovies = response.movies.filter(movie => movie.status === "now_playing");

        // ✅ Sort movies by tickets sold (highest first)
        const sortedMovies = filteredMovies.sort((a, b) => b.tickets.sold - a.tickets.sold);
        
        setMovies(sortedMovies);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="revenue-dashboard">
        <h2>🎟 Total Revenue Dashboard</h2>
        <p className="subheading">Showing only "Now Playing" movies</p> 

        <div className="movies-list">
          <table>
            <thead>
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Total Tickets</th>
                <th>Sold</th>
                <th>Left</th>
                <th>Price (₹)</th>
                <th>Total Revenue (₹)</th>
              </tr>
            </thead>
            <tbody>
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <tr key={movie._id} className={index === 0 ? "top-seller" : ""}>
                    <td>
                      <img 
                        src={`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}${movie.poster}`} 
                        alt={movie.title} 
                        className="movie-poster"
                        onError={(e) => { e.target.src = "/default-poster.jpg"; }} 
                      />
                    </td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre.join(", ")}</td>
                    <td>{movie.tickets.total}</td>
                    <td className="highlight-sold">{movie.tickets.sold}</td>
                    <td>{movie.tickets.available}</td>
                    <td>₹{movie.pricing.pricePerTicket}</td>
                    <td className="total-revenue">₹{movie.pricing.totalRevenue}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No movies available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TotalRevenue;
