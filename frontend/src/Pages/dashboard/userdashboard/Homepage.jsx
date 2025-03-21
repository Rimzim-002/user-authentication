import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { motion } from "framer-motion";
import axios from "axios";

function Home() {
    const [movies, setMovies] = useState([]);
    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://www.freetestapi.com/api/v1/movies", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4 fw-bold">🎬 Movie Dashboard</h2>
                <div className="row">
                    {movies.map((movie, index) => (
                        <motion.div
                            key={movie.id}
                            className="col-md-4 col-lg-3 mb-4"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="card shadow-lg border-0 h-100">
                                <img 
                                    src={movie.poster} 
                                    className="card-img-top movie-poster" 
                                    alt={movie.title} 
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{movie.title} ({movie.year})</h5>
                                    <p className="card-text"><strong>Genre:</strong> {movie.genre.join(", ")}</p>
                                    <p className="card-text"><strong>Rating:</strong> ⭐ {movie.rating}</p>
                                    <p className="card-text"><strong>Director:</strong> {movie.director}</p>
                                    <p className="card-text"><strong>Actors:</strong> {movie.actors.join(", ")}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <a href={movie.website} target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-sm me-2">
                                        More Info
                                    </a>
                                    <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                        🎥 Watch Trailer
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Custom Styling */}
            <style jsx>{`
                .movie-poster {
                    width: 100%;
                    height: 350px;
                    object-fit: cover;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .card {
                    border-radius: 10px;
                    overflow: hidden;
                    transition: transform 0.3s ease-in-out;
                }
                .card:hover {
                    transform: scale(1.03);
                }
                .card-body {
                    padding: 15px;
                }
                .card-footer {
                    background: #f8f9fa;
                    padding: 10px;
                }
            `}</style>
        </>
    );
}

export default Home;
