import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import UserNav from "../../../components/UserNav";
import { getAllMoviesUser } from "../../../Services/userservices";
import { toast, Toaster } from "react-hot-toast";

import "../../styles/userdashboard.css";
import { APP_ROUTES } from "../../../Routes/routes";
import { ClipLoader } from "react-spinners"; // Import loader

function UserDashboard() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getAllMoviesUser();
            setMovies(response.movies);
            setFilteredMovies(response.movies.filter(movie => !movie.deleted));
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false); // Hide loader after fetching
        }
    };

    const filterMoviesByLanguage = (language) => {
        setSelectedLanguage(language);
        let updatedMovies = movies;
        if (language !== "All") {
            updatedMovies = movies.filter((movie) => movie.language.toLowerCase() === language.toLowerCase());
        }
        setFilteredMovies(
            updatedMovies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = movies.filter(
            (movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase()) &&
                (selectedLanguage === "All" || movie.language.toLowerCase() === selectedLanguage.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        filterMoviesByLanguage(selectedLanguage);
    };
    const upcomingMessage = () => {
        toast("Will come soon");
    };
    return (
        <>
            <div className="user-dashboard-main">
                <UserNav />
                <Toaster position="top-right" />

                <div className="user-dashboard-container">

                    {/* Loader */}
                    {loading ? (
                        <div className="loader-container">
                            <ClipLoader size={50} color="#007bff" />
                        </div>
                    ) : (
                        <>
                            {/* Search Bar */}
                            <div className="searchbar-container">
                                <div className="searchbar">
                                    <Search size={20} className="search-icon" />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search for movies..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <X size={18} className="clear-icon" onClick={handleClearSearch} />
                                    )}
                                </div>
                            </div>

                            <h2>All Movies</h2>

                            <div className="user-dashboard-filter-buttons">
                                {["All", "English", "Tamil", "Hindi"].map((lang) => (
                                    <button
                                        key={lang}
                                        className={`user-dashboard-filter-btn ${selectedLanguage === lang ? "active" : ""}`}
                                        onClick={() => filterMoviesByLanguage(lang)}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            <h3>Upcoming</h3>
                            <div className="user-dashboard-grid">
                                {filteredMovies.filter((m) => m.status === "upcoming").length > 0 ? (
                                    filteredMovies
                                        .filter((m) => m.status === "upcoming")
                                        .map((movie) => (
                                            <div key={movie._id} className="user-dashboard-card">
                                                <img
                                                    src={movie.poster.startsWith("http")
                                                        ? movie.poster
                                                        : `${process.env.REACT_APP_API_BASE_URL_2 || "http://localhost:5000"}${movie.poster}`}
                                                    alt={movie.title}
                                                    onError={(e) => { e.target.src = "/default-poster.jpg"; }}
                                                />
                                                <h4 className="user-dashboard-title-link" onClick={upcomingMessage}>
                                                    {movie.title}
                                                </h4>                                                <p>{movie.genre.join(", ")}</p>
                                                <p className="user-dashboard-language">{movie.language}</p>
                                                <button className="user-dashboard-trailer-btn" onClick={() => window.open(movie.trailer, "_blank")}>
                                                    🎥 Watch Trailer
                                                </button>
                                            </div>
                                        ))
                                ) : (
                                    <p>No "Upcoming" movies found.</p>
                                )}
                            </div>

                            <h3>Now Playing</h3>
                            <div className="user-dashboard-grid">
                                {filteredMovies.filter((m) => m.status === "now_playing").length > 0 ? (
                                    filteredMovies
                                        .filter((m) => m.status === "now_playing")
                                        .map((movie) => (
                                            <div key={movie._id} className="user-dashboard-card">
                                                <img
                                                    src={movie.poster.startsWith("http")
                                                        ? movie.poster
                                                        : `${process.env.REACT_APP_API_BASE_URL_2 || "http://localhost:5000"}${movie.poster}`}
                                                    alt={movie.title}
                                                    onError={(e) => { e.target.src = "/default-poster.jpg"; }}
                                                />
                                                <Link to={`${APP_ROUTES.MOVIE_DETAILS.replace(":movieId", movie?._id)}`} className="user-dashboard-title-link">
                                                    {movie?.title}
                                                </Link>
                                                <p>{movie.genre.join(", ")}</p>
                                                <p className="user-dashboard-language">{movie.language}</p>
                                                <button className="user-dashboard-trailer-btn" onClick={() => window.open(movie.trailer, "_blank")}>
                                                    🎥 Watch Trailer
                                                </button>
                                            </div>
                                        ))
                                ) : (
                                    <p>No "Now Playing" movies found.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
