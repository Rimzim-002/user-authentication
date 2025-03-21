import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import { getMovie } from "../../../Utils/api";
import "../../styles/newmoviedetails.css"; // ✅ Unique CSS file

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
console.log(movie,"34567890-")
    // ✅ Memoized API Cal
    const fetchMovieDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getMovie(movieId);
            setMovie((prevMovie) => 
                prevMovie?._id === response.movie._id ? prevMovie : response.movie
            );
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovieDetails();
    }, [fetchMovieDetails]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="movie-details-page">
            <UserNav />
            <div className="movie-details-card">
                <h2 className="movie-details-title">{movie?.title}</h2>
                
                {/* 🎞 Movie Poster */}
                <div className="movie-details-poster-container">
                    <img
                        className="movie-details-poster"
                        src={movie?.poster?.startsWith("http")
                            ? movie.poster
                            : `${process.env.REACT_APP_API_BASE_URL_2 || "http://localhost:5000"}${movie.poster}`}
                        alt={movie?.title || "Movie Poster"}
                        onError={(e) => {
                            if (e.target.src !== "/default-poster.jpg") {
                                e.target.src = "/default-poster.jpg"; // ✅ Fallback Image
                            }
                        }}
                    />
                </div>

                {/* 🎬 Movie Details */}
                <div className="movie-details-info">
                    <p><strong>Genre:</strong> {movie?.genre?.join(", ")}</p>
                    <p><strong>Language:</strong> {movie?.language}</p>
                    <p><strong>Runtime:</strong> {movie?.runtime} minutes</p>
                    <p><strong>Rating:</strong> {movie?.rating}/10</p>
                </div>

                {/* 🎬 Watch Trailer & 🎟 Book Ticket Buttons */}
                <div className="movie-details-buttons">
                    {movie?.trailer ? (
                        <button onClick={() => window.open(movie.trailer, "_blank")} className="movie-details-btn movie-details-trailer-btn">
                            🎥 Watch Trailer
                        </button>
                    ) : (
                        <p>No trailer available</p>
                    )}

                    <button onClick={() => navigate(`/user/dashboard/bookticket/${movie?._id}`)} className="movie-details-btn movie-details-book-btn">
                        🎟 Book Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
