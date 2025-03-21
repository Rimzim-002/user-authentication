import React, { useState, useEffect } from "react";
import { addMovie, getAllMovies, deleteMovie, updateMovie } from "../../../Utils/api.js"; // ✅ Added updateMovie
import Navbar from "../../../components/Navbar.jsx";
import "../../styles/moviesmanagement.css";

function MoviesManagement() {
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({}); // ✅ Error state for validation messages

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
  const validateForm = () => {
    let errors = {};
    
    if (!movieData.title.trim()) errors.title = "Title is required.";
    if (!movieData.year || movieData.year < 1900 || movieData.year > new Date().getFullYear()) 
      errors.year = "Enter a valid year. above 1900";
    if (!movieData.genre.trim()) errors.genre = "Genre is required.";
    if (!movieData.rating || movieData.rating < 1 || movieData.rating > 10) 
      errors.rating = "Rating must be between 1 and 10.";
    if (!movieData.trailer.trim()) errors.trailer = "Trailer URL is required.";
    if (!movieData.runtime || movieData.runtime <= 0) 
      errors.runtime = "Runtime must be greater than 0.";
    if (!movieData.country.trim()) errors.country = "Country is required.";
    if (!movieData.language.trim()) errors.language = "Language is required( only Hindi, English and Tamil).";
    if (!movieData.production.trim()) errors.production = "Production is required.";
    if (!movieData.pricePerTicket || movieData.pricePerTicket <= 0) 
      errors.pricePerTicket = "Ticket price must be greater than 0.";
    if (!movieData.totalTickets || movieData.totalTickets <= 0) 
      errors.totalTickets = "Total tickets must be greater than 0.";
    if (!movieData.poster && !editingMovie) 
      errors.poster = "Poster is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0; // ✅ Returns true if no errors
  };

  const handleSubmit = async (status) => {
    if (!validateForm()) return; // ✅ Stop submission if validation fails

    const formData = new FormData();
    Object.keys(movieData).forEach((key) => {
      formData.append(key, movieData[key]);
    });
    formData.append("status", status);

    try {
      await addMovie(formData);
      fetchMovies();
      setMovieData({
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
      setErrors({}); // ✅ Clear errors after successful submission
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return; // ✅ Stop updating if validation fails

    const formData = new FormData();
    Object.keys(movieData).forEach((key) => {
      formData.append(key, movieData[key]);
    });

    try {
      await updateMovie(editingMovie._id, formData);
      fetchMovies();
      setEditingMovie(null);
      setMovieData({
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
      setErrors({}); // ✅ Clear errors after successful update
    } catch (error) {
      console.error("Error updating movie:", error);
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

  // const handleUpdate = async () => {
  //   const formData = new FormData();
  //   Object.keys(movieData).forEach((key) => {
  //     formData.append(key, movieData[key]);
  //   });

  //   try {
  //     await updateMovie(editingMovie._id, formData);
  //     fetchMovies();
  //     setEditingMovie(null);
  //   } catch (error) {
  //     console.error("Error updating movie:", error);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="movies-management-container">
        <h2>Movie Management</h2>

        {/* Add Movie Form */}
        <div className="add-movie-form">
          <input type="text" name="title" placeholder="Title" onChange={handleChange} value={movieData.title} />
          {errors.title && <p className="error">{errors.title}</p>}

          <input type="number" name="year" placeholder="Year" onChange={handleChange} value={movieData.year} />
          {errors.year && <p className="error">{errors.year}</p>}

          <input type="text" name="genre" placeholder="Genre (comma-separated)" onChange={handleChange} value={movieData.genre} />
          {errors.genre && <p className="error">{errors.genre}</p>}

          <input type="number" name="rating" placeholder="Rating" onChange={handleChange} value={movieData.rating} />
          {errors.rating && <p className="error">{errors.rating}</p>}

          <input type="text" name="trailer" placeholder="Trailer URL" onChange={handleChange} value={movieData.trailer} />
          {errors.trailer && <p className="error">{errors.trailer}</p>}

          <input type="number" name="runtime" placeholder="Runtime (mins)" onChange={handleChange} value={movieData.runtime} />
          {errors.runtime && <p className="error">{errors.runtime}</p>}

          <input type="text" name="country" placeholder="Country" onChange={handleChange} value={movieData.country} />
          {errors.country && <p className="error">{errors.country}</p>}

          <input type="text" name="language" placeholder="Language" onChange={handleChange} value={movieData.language} />
          {errors.language && <p className="error">{errors.language}</p>}

          <input type="text" name="production" placeholder="Production" onChange={handleChange} value={movieData.production} />
          {errors.production && <p className="error">{errors.production}</p>}

          <input type="number" name="pricePerTicket" placeholder="Price per Ticket" onChange={handleChange} value={movieData.pricePerTicket} />
          {errors.pricePerTicket && <p className="error">{errors.pricePerTicket}</p>}

          <input type="number" name="totalTickets" placeholder="Total Tickets" onChange={handleChange} value={movieData.totalTickets} />
          {errors.totalTickets && <p className="error">{errors.totalTickets}</p>}

          <input type="file" name="poster" accept="image/*" onChange={handleChange} />
          {errors.poster && <p className="error">{errors.poster}</p>}

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
