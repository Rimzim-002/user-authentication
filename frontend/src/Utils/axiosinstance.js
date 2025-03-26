import axios from "axios";
import Logger from "./logger"; // ✅ Import centralized logger
import MESSAGES from "./messages"; // ✅ Import centralized messages

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
        Logger.log("🔄 [API REQUEST]:", config.method.toUpperCase(), config.url, config.data);
        return config;
    },
    (error) => {
        Logger.error("❌ [REQUEST ERROR]:", error);
        return Promise.reject(error);
    }
);

// ✅ Log Responses & Handle Errors
axiosInstance.interceptors.response.use(
    (response) => {
        Logger.log("✅ [API RESPONSE]:", response.status, response.data);
        return response;
    },
    (error) => {
        Logger.error(MESSAGES.SYSTEM.SERVER_ERROR, error.response ? error.response.data : error.message);

        // ✅ Handle Unauthorized Access (401)
        if (error.response?.status === 401) {
            Logger.warn(MESSAGES.AUTH.UNAUTHORIZED);
            localStorage.removeItem("authToken");
            window.location.href = "/login"; // Redirect user to login
        }

        return Promise.reject(error);
    }
);

// ✅ Function to Update Base URL Dynamically
export const setBaseUrl = (newBaseUrl) => {
    axiosInstance.defaults.baseURL = newBaseUrl;
};

// ✅ Export axiosInstance for use in other files
export default axiosInstance;
