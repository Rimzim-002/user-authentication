import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import { getMovie } from "../../../Services/userservices";
import { toast, Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // Import loader
import "../../styles/newmoviedetails.css";
import { APP_ROUTES } from "../../../Routes/routes";

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Memoized API Call
    const fetchMovieDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getMovie(movieId);
            if (response?.data) {
                setMovie((prevMovie) =>
                    prevMovie?._id === response.data?._id ? prevMovie : response.data
                );
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
            toast.error("Failed to load movie details.");
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovieDetails();
    }, [fetchMovieDetails]);

    return (
        <div className="movie-details-page">
            <UserNav />
            <Toaster position="top-right" />

            {loading ? (
                <div className="loader-container">
                    <ClipLoader size={50} color="#007bff" />
                </div>
            ) : (
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
                                    e.target.src = "/default-poster.jpg";
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
                        <button
                            onClick={() => navigate(APP_ROUTES.BOOK_TICKET.replace(":movieId", movie?._id))}
                            className="movie-details-btn movie-details-book-btn"
                        >
                            🎟 Book Ticket
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
