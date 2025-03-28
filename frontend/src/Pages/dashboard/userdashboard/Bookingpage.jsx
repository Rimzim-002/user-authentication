import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookingmovie, getMovie, updatePaymentStatus } from "../../../Services/userservices";
import { jwtDecode } from "jwt-decode";
import "../../styles/bookingpage.css";
import { APP_ROUTES } from "../../../Routes/routes";
import { ClipLoader } from "react-spinners";
import { toast, Toaster } from "react-hot-toast";

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

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.id) {
                    setUserId(decoded.id);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }

        const fetchMovie = async () => {
            try {
                const response = await getMovie(movieId);
                if (response?.data) {
                    setMovie(response.data);
                } else {
                    toast.error("Movie data not found!");
                }
            } catch (error) {
                toast.error("Error fetching movie data.");
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId, token]);

    const handleBooking = async () => {
        if (!paymentMethod) {
            toast.error(" Please select a payment method!", { duration: 3000 });
            return;
        }
        if (!userId) {
            toast.error(" User ID not found. Please login again.");
            return;
        }

        try {
            const response = await bookingmovie(movieId, seats, paymentMethod);
            if (response && response.orderId) {
                setOrderId(response.orderId);
                setShowPaymentModal(true);
                toast.success(" Booking successful! Please proceed with payment.");
            } else {
                toast.error("⚠️ Order ID not found. Please try again.");
            }
        } catch (error) {
            toast.error(" Booking failed. Please try again.");
        }
    };

    const handleConfirmPayment = async () => {
        try {
            if (!orderId) {
                toast.error(" No order ID found.");
                return;
            }

            await updatePaymentStatus(orderId, "successful");
            toast.success(" Payment successful! Redirecting...");
            setShowPaymentModal(false);
            navigate(APP_ROUTES.USER_DASHBOARD);
        } catch (error) {
            toast.error(" Payment update failed.");
        }
    };

    return (
        <div className="booking-page">
            <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Ensure Toaster is included */}

            <div className="booking-card">
                {loading ? (
                    <div className="loader-container">
                        <ClipLoader size={50} color="#007bff" />
                    </div>
                ) : movie ? (
                    <>
                        <h2 className="booking-title">Book Tickets for {movie?.title}</h2>

                        <div className="poster-container">
                            <img
                                className="booking-poster"
                                src={movie?.poster?.startsWith("http")
                                    ? movie.poster
                                    : `${process.env.REACT_APP_API_BASE_URL_2 || "http://localhost:5000"}${movie.poster}`}
                                alt={movie?.title || "Movie Poster"}
                                onError={(e) => { e.target.src = "/default-poster.jpg"; }}
                            />
                        </div>

                        <div className="booking-info">
                            <p><strong>Genre:</strong> {movie?.genre?.join(", ")}</p>
                            <p><strong>Language:</strong> {movie?.language}</p>
                            <p><strong>Runtime:</strong> {movie?.runtime} minutes</p>
                            <p><strong>Rating:</strong> {movie?.rating}/10</p>
                            <p><strong>Price per Ticket:</strong> Rs {movie?.pricing?.pricePerTicket || 10}</p>
                        </div>

                        <div className="booking-form">
                            <label><strong>Select Seats:</strong></label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={seats}
                                onChange={(e) => setSeats(Number(e.target.value))}
                                className="seat-input"
                            />
                            <p><strong>Total Price:</strong> Rs {seats * (movie?.pricing?.pricePerTicket || 10)}</p>

                            <label><strong>Choose Payment Method:</strong></label>
                            <select 
                                value={paymentMethod} 
                                onChange={(e) => setPaymentMethod(e.target.value)} 
                                className="payment-select"
                            >
                                <option value="">Select Payment</option>
                                <option value="credit">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="upi">UPI</option>
                            </select>

                            <button onClick={handleBooking} className="confirm-btn">
                                Book Now
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Error: Movie not found!</p>
                )}
            </div>

            {/* ✅ Payment Modal */}
            {showPaymentModal && (
                <div className="payment-modal">
                    <div className="payment-modal-content">
                        <h2>Confirm Payment</h2>
                        <p><strong>Order ID:</strong> {orderId}</p>
                        <p><strong>Total Amount:</strong> Rs {seats * (movie?.pricing?.pricePerTicket || 10)}</p>
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
