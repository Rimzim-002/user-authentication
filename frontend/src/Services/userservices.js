
import API_ROUTES from "../Utils/apiroutes";
import axiosInstance from "../Utils/axiosinstance";


export const getAllMoviesUser = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.USER.FETCH_ALL_MOVIES  );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
export const getMovie = async (movieId) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.USER.FETCH_MOVIE_BY_ID(movieId));
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};


export const bookingmovie = async (movieId, seats, paymentMethod) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("User not authenticated");
        const bookingData = {
            movieId,
            ticketsBooked: seats,
            paymentMethod,
        };

        // Ensure the movieId is MongoDB _id
        const response = await axiosInstance.post(API_ROUTES.USER.BOOK_MOVIE(movieId), bookingData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        

        return response.data;  // Ensure the backend sends the full order info
    } catch (error) {
        console.error("Error booking movie:", error);
        throw error;
    }
};

export const updatePaymentStatus = async (orderId, status) => {
    try {
        const token = localStorage.getItem("authToken");
        console.log("Sending payment update request:", { orderId, status }); // Debugging

        const response = await axiosInstance.post(API_ROUTES.USER.PAYMENT, 
            { orderId, status }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Payment update successful:", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error("Error updating payment status:", error.response?.data || error);
        throw error;
    }
};
// ✅ Fetch User Orders
export const getUserOrders = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("User not authenticated");

        // Send GET request to backend to fetch user orders
        const response = await axiosInstance.get(API_ROUTES.USER.GET_ORDERS, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data?.data; // Return the orders data
    } catch (error) {
        console.error("Error fetching user orders:", error.response ? error.response.data : error.message);
        throw error;
    }
};