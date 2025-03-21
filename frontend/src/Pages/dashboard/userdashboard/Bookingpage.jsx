import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookingmovie, getMovie, updatePaymentStatus } from "../../../Utils/api";
import { jwtDecode } from "jwt-decode";
import "../../styles/bookingpage.css";

const BookingPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seats, setSeats] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [userId, setUserId] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
console.log("id",movieId)
    const token = localStorage.getItem("authToken");
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.id) {
                    setUserId(decoded.id);
                } else {
                    console.error("User ID missing in token");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }

        const fetchMovie = async () => {
            try {
                const response = await getMovie(movieId);
                if (response && response.movie) {
                    setMovie(response.movie);
                }
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId, token]);

    const handleBooking = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
    
        if (!userId) {
            alert("User ID not found. Please login again.");
            return;
        }
    
        try {
            const response = await bookingmovie(movieId, seats, paymentMethod);
            console.log("Booking response:", response);
    
            if (response && response.orderId) {
                setOrderId(response.orderId); // Store the orderId from the response
                setShowPaymentModal(true); // Show payment modal
            } else {
                console.error("Order ID missing in response:", response);
                alert("Order ID not found. Please try again.");
            }
        } catch (error) {
            console.error("Booking failed:", error);
            alert("❌ Booking failed. Please try again.");
        }
    };
    
    
    
    

    const handleConfirmPayment = async () => {
        try {
            console.log("Booking initiated for movieId:", orderId); // 🔍 Debugging log

            if (!orderId) {
                alert("No order ID found.");
                return;
            }
    
            await updatePaymentStatus(orderId, "successful");
            alert("✅ Payment successful! Redirecting...");
            setShowPaymentModal(false);
            navigate("/user/dashboard");
        } catch (error) {
            console.error("Payment update failed:", error);
            alert("❌ Payment update failed.");
        }
    };
    
    if (loading) return <p>Loading movie details...</p>;
    if (!movie) return <p>Error: Movie not found!</p>;

    const ticketPrice = movie?.pricing?.pricePerTicket || 10;

    return (
        <div className="booking-page">
            <div className="booking-card">
                <h2 className="booking-title">Book Tickets for {movie?.title}</h2>

                <div className="poster-container">
                    <img
                        className="booking-poster"
                        src={movie?.poster?.startsWith("http")
                            ? movie.poster
                            : `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}${movie.poster}`}
                        alt={movie?.title || "Movie Poster"}
                        onError={(e) => { e.target.src = "/default-poster.jpg"; }}
                    />
                </div>

                <div className="booking-info">
                    <p><strong>Genre:</strong> {movie?.genre?.join(", ")}</p>
                    <p><strong>Language:</strong> {movie?.language}</p>
                    <p><strong>Runtime:</strong> {movie?.runtime} minutes</p>
                    <p><strong>Rating:</strong> {movie?.rating}/10</p>
                    <p><strong>Price per Ticket:</strong> Rs {ticketPrice}</p>
                </div>

                <div className="booking-form">
                    <label><strong>Select Seats:</strong></label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={seats}
                        onChange={(e) => setSeats(Number(e.target.value))}                        className="seat-input"
                    />
                    <p><strong>Total Price:</strong> Rs {seats * ticketPrice}</p>

                    <label><strong>Choose Payment Method:</strong></label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="payment-select">
                        <option value="">Select Payment</option>
                        <option value="credit">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="upi">UPI</option>
                    </select>

                    <button onClick={handleBooking} className="confirm-btn">
                        Book Now
                    </button>
                </div>
            </div>

            {/* ✅ Payment Modal */}
            {showPaymentModal && (
                <div className="payment-modal">
                    <div className="payment-modal-content">
                        <h2>Confirm Payment</h2>
                        <p><strong>Order ID:</strong> {orderId}</p>
                        <p><strong>Total Amount:</strong> Rs {seats * ticketPrice}</p>
                        <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
                        <button onClick={handleConfirmPayment} className="confirm-btn">Confirm Payment</button>
                        <button onClick={() => setShowPaymentModal(false)} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingPage;
