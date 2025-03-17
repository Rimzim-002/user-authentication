import React, { useState, useEffect } from "react";
import UserNav from "../../components/UserNav";
import Searchbar from "../../components/Searchbar";
import { getAllMovies } from "../../Utils/api";
import "../styles/moviesmanagement.css"; // ✅ Reusing same theme

function UserDashboard() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); // ✅ Store filtered movies
    const [selectedLanguage, setSelectedLanguage] = useState("All"); // ✅ Track selected language

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getAllMovies();
            setMovies(response.movies);
            setFilteredMovies(response.movies); // ✅ Show all movies initially
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // ✅ Filter movies based on selected language
    const filterMoviesByLanguage = (language) => {
        setSelectedLanguage(language);
        if (language === "All") {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter((movie) => movie.language.toLowerCase() === language.toLowerCase());
            setFilteredMovies(filtered);
        }
    };

    return (
        <>
            <div className="main-div">
                <UserNav />
                <div className="movies-management-container">
                    <Searchbar />

                    <h2>All Movies</h2>

                    {/* 🎯 Language Filter Buttons */}
                    <div className="filter-buttons">
                        {["All", "English", "Tamil", "Hindi"].map((lang) => (
                            <button 
                                key={lang} 
                                className={`filter-btn ${selectedLanguage === lang ? "active" : ""}`} 
                                onClick={() => filterMoviesByLanguage(lang)}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    {/* 🎬 Now Playing Movies Section */}
                    {/* 🎬 Upcoming Movies Section */}
                    <h3>Upcoming</h3>
                    <div className="movies-grid">
                        {filteredMovies.filter((m) => m.status === "upcoming").length > 0 ? (
                            filteredMovies.filter((m) => m.status === "upcoming").map((movie) => (
                                <div key={movie._id} className="movie-card">
                                    <img 
                                        src={movie.poster.startsWith("http") 
                                                ? movie.poster 
                                                : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}${movie.poster}`}
                                        alt={movie.title}
                                        onError={(e) => { e.target.src = "/default-poster.jpg"; }} // ✅ Fallback image
                                    />
                                    <h4>{movie.title}</h4>
                                    <p>{movie.genre.join(", ")}</p>
                                    <p className="movie-language">{movie.language}</p>
                                    {/* 🎬 Watch Trailer Button */}
                                    <button 
                                        className="trailer-btn"
                                        onClick={() => window.open(movie.trailer, "_blank")}
                                    >
                                        🎥 Watch Trailer
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No "Upcoming" movies found.</p>
                        )}
                    </div>
                    <h3>Now Playing</h3>
                    <div className="movies-grid">
                        {filteredMovies.filter((m) => m.status === "now_playing").length > 0 ? (
                            filteredMovies.filter((m) => m.status === "now_playing").map((movie) => (
                                <div key={movie._id} className="movie-card">
                                    <img 
                                        src={movie.poster.startsWith("http") 
                                                ? movie.poster 
                                                : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}${movie.poster}`}
                                        alt={movie.title}
                                        onError={(e) => { e.target.src = "/default-poster.jpg"; }} // ✅ Fallback image
                                    />
                                    <h4>{movie.title}</h4>
                                    <p>{movie.genre.join(", ")}</p>
                                    <p className="movie-language">{movie.language}</p>
                                    {/* 🎬 Watch Trailer Button */}
                                    <button 
                                        className="trailer-btn"
                                        onClick={() => window.open(movie.trailer, "_blank")}
                                    >
                                        🎥 Watch Trailer
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No "Now Playing" movies found.</p>
                        )}
                    </div>

                    

                </div>
            </div>
        </>
    );
}

export default UserDashboard;
