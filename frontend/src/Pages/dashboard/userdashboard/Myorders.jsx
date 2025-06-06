import React, { useState, useEffect } from "react";
import { ShoppingBag, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import UserNav from "../../../components/UserNav";
import { getUserOrders } from "../../../Services/userservices";
import { ClipLoader } from "react-spinners"; // ✅ Import Loader
import "../../styles/myorders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("orders", orders);

  // Define API Base URL
  const posterBaseUrl = process.env.REACT_APP_API_BASE_URL_2 || "http://localhost:5000";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getUserOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError("No orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to format date and time
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  return (
    <>
      <UserNav />
      <div className="orders-container">
        <h2 className="orders-title">
          <ShoppingBag size={24} /> My Orders
        </h2>

        {loading ? (
          <div className="loader-container">
            <ClipLoader size={50} color="#007bff" />
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card-horizontal">
                {/* Poster Image */}
                <div className="poster-container">
                  <img
                    className="order-movie-poster"
                    src={order?.movieId?.poster?.startsWith("http")
                      ? order.movieId.poster
                      : `${posterBaseUrl}${order.movieId.poster}`
                    }
                    alt={order.movieId.title}
                    onError={(e) => { e.target.src = "/default-movie.jpg"; }} // ✅ Fallback image
                  />
                </div>

                {/* Order Info */}
                <div className="order-details">
                  <h3 className="movie-title">{order.movieId.title}</h3>
                  <p className="booking-time">
                    <Calendar size={16} /> <strong>Booked On:</strong> {formatDateTime(order.createdAt)}
                  </p>
                  <p className="ticket-count"><strong>🎟 Tickets:</strong> {order.ticketsBooked}</p>
                  <p className="order-total"><strong>💰 Total:</strong> ₹{order.totalAmount}</p>

                  {/* Payment Status */}
                  <p className={`status ${order.paymentStatus}`}>
                    {order.paymentStatus === "pending" ? (
                      <Clock size={16} />
                    ) : order.paymentStatus === "successful" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                    {order.paymentStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
