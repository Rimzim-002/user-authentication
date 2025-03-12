import axios from "axios";

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


// ✅ Export axiosInstance for use in other files if needed
export default axiosInstance;
