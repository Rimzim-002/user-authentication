import axios from "axios";
import { jwtDecode } from "jwt-decode";
// ✅ Define BASE_URL (Can be changed dynamically)
export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// ✅ Create Axios Instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// ✅ Automatically Attach Authorization Header
const getToken = () => localStorage.getItem("authToken");

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Function to Update Base URL Dynamically
export const setBaseUrl = (newBaseUrl) => {
    axiosInstance.defaults.baseURL = newBaseUrl;
};

// ✅ AUTH APIs
export const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post("/auth/login", formData);
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const signupUser = async (formData) => {
    try {
        const response = await axiosInstance.post("/auth/signup", formData);
        return response.data;
    } catch (error) {
        console.error("Signup error:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// ✅ USER APIs
export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// ✅ ADMIN APIs (Fixed Function Name)
export const fetchAdminUsers = async () => {
    try {
        const response = await axiosInstance.get("/admin/adminusers");
        return response.data;
    } catch (error) {
        console.error("Error fetching admin users:", error);
        throw error;
    }
};
// ✅ DELETE User API
export const deleteUser = async (userId) => {
    if (!userId) {
        console.error("Error: userId is missing in delete request.");
        return;
    }

    try {
        const response = await axios.delete(`${BASE_URL}/admin/deleteuser/${userId}`);
        console.log(`User ${userId} deleted successfully`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};


// ✅ UPDATE User API
    export const updateUser = async (userId, userData) => {
        try {
            const response = await axiosInstance.patch(`/admin/edituser/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error.response ? error.response.data : error.message);
            throw error;
        }
    };
// ✅ MOVIE APIs
export const addMovie = async (formData) => {
    try {
        const response = await axiosInstance.post("admin/addmovies", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding movie:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("admin/getAllMovies");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

export const getMovieById = async (movieId) => {
    try {
        const response = await axiosInstance.get(`admin/getMovie/${movieId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        throw error;
    }
};

export const deleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.delete(`admin/deleteMovie/${movieId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};

export const updateMovie = async (movieId, formData) => {
    try {
        const response = await axiosInstance.put(`admin/movie/${movieId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error updating movie:", error.response ? error.response.data : error.message);
        throw error;
    }
};
export const getAllMoviesUser = async () => {
    try {
        const response = await axiosInstance.get("/user/allmovies");
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
export const getMovie = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/user/getmovie/${movieId}`);
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

        // Decode token to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        // Send booking data to backend
        const bookingData = {
            ticketsBooked: seats,
            paymentMethod,
        };

        // Ensure the movieId is MongoDB _id
        const response = await axiosInstance.post(`/user/bookticket/${movieId}`, bookingData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        

        return response.data;  // Ensure the backend sends the full order info
    } catch (error) {
        console.error("Error booking movie:", error);
        throw error;
    }
};

export const updatePaymentStatus = async (id, status) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.put(`/user/updatepayment/${id}`, 
            { status }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating payment status:", error);
        throw error;
    }
};
// ✅ Fetch User Orders
export const getUserOrders = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("User not authenticated");

        // Send GET request to backend to fetch user orders
        const response = await axiosInstance.get("/user/getUserOrder", {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data.orders; // Return the orders data
    } catch (error) {
        console.error("Error fetching user orders:", error.response ? error.response.data : error.message);
        throw error;
    }
};


// ✅ Export axiosInstance for use in other files if needed
export default axiosInstance;
