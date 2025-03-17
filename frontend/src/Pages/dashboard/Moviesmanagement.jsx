import React, { useState, useEffect } from "react";
import { addMovie, getAllMovies, deleteMovie, updateMovie } from "../../Utils/api.js"; // ✅ Added updateMovie
import Navbar from "../../components/Navbar";
import "../styles/moviesmanagement.css";

function MoviesManagement() {
  const [movies, setMovies] = useState([]);
  console.log(movies,"3456y8o9-]")
  const [movieData, setMovieData] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    trailer: "",
    runtime: "",
    country: "",
    language: "",
    production: "",
    pricePerTicket: "",
    totalTickets: "",
    poster: null,
  });
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      setMovies(response.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "poster") {
      setMovieData({ ...movieData, poster: e.target.files[0] });
    } else {
      setMovieData({ ...movieData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (status) => {
    const formData = new FormData();
    Object.keys(movieData).forEach((key) => {
      formData.append(key, movieData[key]);
    });
    formData.append("status", status);

    try {
      await addMovie(formData);
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setMovieData({
      title: movie.title,
      year: movie.year,
      genre: movie.genre.join(", "),
      rating: movie.rating,
      trailer: movie.trailer,
      runtime: movie.runtime,
      country: movie.country,
      language: movie.language,
      production: movie.production,
      pricePerTicket: movie.pricing.pricePerTicket,
      totalTickets: movie.tickets.total,
      poster: null,
    });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.keys(movieData).forEach((key) => {
      formData.append(key, movieData[key]);
    });

    try {
      await updateMovie(editingMovie._id, formData);
      fetchMovies();
      setEditingMovie(null);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="movies-management-container">
        <h2>Movie Management</h2>

        {/* Add Movie Form */}
        <div className="add-movie-form">
          <input type="text" name="title" placeholder="Title" onChange={handleChange} value={movieData.title} />
          <input type="number" name="year" placeholder="Year" onChange={handleChange} value={movieData.year} />
          <input type="text" name="genre" placeholder="Genre (comma-separated)" onChange={handleChange} value={movieData.genre} />
          <input type="number" name="rating" placeholder="Rating" onChange={handleChange} value={movieData.rating} />
          <input type="text" name="trailer" placeholder="Trailer URL" onChange={handleChange} value={movieData.trailer} />
          <input type="number" name="runtime" placeholder="Runtime (mins)" onChange={handleChange} value={movieData.runtime} />
          <input type="text" name="country" placeholder="Country" onChange={handleChange} value={movieData.country} />
          <input type="text" name="language" placeholder="Language" onChange={handleChange} value={movieData.language} />
          <input type="text" name="production" placeholder="Production" onChange={handleChange} value={movieData.production} />
          <input type="number" name="pricePerTicket" placeholder="Price per Ticket" onChange={handleChange} value={movieData.pricePerTicket} />
          <input type="number" name="totalTickets" placeholder="Total Tickets" onChange={handleChange} value={movieData.totalTickets} />
          <input type="file" name="poster" accept="image/*" onChange={handleChange} />

          {editingMovie ? (
            <button onClick={handleUpdate}>Update Movie</button>
          ) : (
            <>
              <button onClick={() => handleSubmit("upcoming")}>Save as Upcoming</button>
              <button onClick={() => handleSubmit("now_playing")}>Save as Now Playing</button>
            </>
          )}
        </div>

       {/* Display Movies */}
<div className="movies-list">
<h3>Upcoming</h3>
  <div className="movies-grid">
    {movies && Array.isArray(movies) && movies.length > 0 ? (
      movies.filter((m) => m.status === "upcoming").map((movie) => (
        <div key={movie._id} className="movie-card">
<img 
  src={
    movie.poster.startsWith("http") 
      ? movie.poster 
      : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}${movie.poster}`
  } 
  alt={movie.title} 
  onError={(e) => { e.target.src = "/default-poster.jpg"; }} // ✅ Fallback image
/>
          <h4>{movie.title}</h4>
          <p>{movie.genre.join(", ")}</p>
          <div className="buttons-cards">
          <button  onClick={() => handleEdit(movie)}>Edit</button>
          <button onClick={() => handleDelete(movie._id)}>Delete</button>
            </div>
        </div>
      ))
    ) : (
      <p>No upcoming movies found.</p>
    )}
  </div>
  <h3>Now Playing</h3>
  <div className="movies-grid">
    {movies && Array.isArray(movies) && movies.length > 0 ? (
      movies.filter((m) => m.status === "now_playing").map((movie) => (

        <div key={movie._id} className="movie-card">
<img 
  src={
    movie.poster.startsWith("http") 
      ? movie.poster 
      : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}${movie.poster}`
  } 
  alt={movie.title} 
  onError={(e) => { e.target.src = "/default-poster.jpg"; }} // ✅ Fallback image
/>
          <h4>{movie.title}</h4>
          <p>{movie.genre.join(", ")}</p>
          <button onClick={() => handleEdit(movie)}>Edit</button>
          <button onClick={() => handleDelete(movie._id)}>Delete</button>
        </div>
      ))
    ) : (
      <p>No movies found.</p>
    )}
  </div>

 
</div>


      </div>
    </>
  );
}

export default MoviesManagement;
