import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar"; // Import Navbar
import { getAllMovies } from "../../../Services/adminservices"; // Fetch movies API
import { ClipLoader } from "react-spinners"; // ✅ Import Loader
import "../../styles/totalrevenue.css"; // Styling

const TotalRevenue = () => {
  const [movies, setMovies] = useState([]); // State for all movies
  const [loading, setLoading] = useState(true); // ✅ Loader state

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true); // ✅ Start loader
    try {
      const response = await getAllMovies();
      if (response && response.movies) {
        setMovies(response.movies); // Set all movies
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  return (
    <>
      <Navbar />
      <div className="revenue-dashboard">
        <h2>🎟 Total Revenue Dashboard</h2>

        {loading ? (
          <div className="loader-container">
            <ClipLoader size={50} color="#007bff" />
            <p>Loading movies...</p>
          </div>
        ) : (
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
                  <th>Status</th> {/* New column for status */}
                </tr>
              </thead>
              <tbody>
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <tr key={movie._id} className={movie.deleted ? "deleted-movie" : "active-movie"}>
                      <td>
                        <img
                          src={
                            movie.poster.startsWith("http")
                              ? movie.poster  
                              : `${process.env.REACT_APP_API_BASE_URL_2 || "http://localhost:5000"}${movie.poster}`
                          }
                          alt={movie.title}
                          className="movie-poster"
                          onError={(e) => { e.target.src = "/default-poster.jpg"; }} // ✅ Fallback image
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
                      <td>
                        {movie.deleted ? (
                          <span className="deleted-indicator">Deleted</span> // Indicate deleted status
                        ) : (
                          <span className="active-indicator">Active</span> // Indicate active status
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No movies available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default TotalRevenue;