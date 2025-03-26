import API_ROUTES from "../Utils/apiroutes";
import axiosInstance from "../Utils/axiosinstance";
// export const fetchUsers = async () => {
//     try {
//         const response = await axiosInstance.get(API_ROUTES.ADMIN.FETCH_ALL_USERS);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         throw error;
//     }
// };

// ✅ ADMIN APIs (Fixed Function Name)
export const fetchAdminUsers = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.ADMIN.FETCH_ALL_USERS);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin users:", error);
        throw error;
    }
};
// ✅ DELETE User API
export const deleteUser  = async (userId) => {
    if (!userId) {
        console.error("Error: userId is missing in delete request.");
        return;
    }

    try {
        const response = await axiosInstance.delete(`/admin/deleteUser/${userId}`);
        console.log(`User ${userId} deleted successfully`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

// ✅ UPDATE User API (Using axiosInstance)
export const updateUser = async (userId, userData) => {
    if (!userId || !userData) {
        console.error("Error: userId or userData is missing in update request.");
        return;
    }

    try {
        const response = await axiosInstance.patch(`/admin/editUser/${userId}`, userData);
        console.log(`User ${userId} updated successfully`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.response ? error.response.data : error.message);
        throw error;
    }
};
// ✅ MOVIE APIs
// ✅ FIXED: Send JSON instead of FormData
export const addMovie = async (movieData) => {
    try {
        const response = await axiosInstance.post("admin/addmovie", movieData, {
            headers: { "Content-Type": "application/json" }, // ✅ JSON instead of multipart/form-data
        });
        return response.data;
    } catch (error) {
        console.error("Error adding movie:", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.ADMIN.FETCH_ALL_MOVIES);
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

export const updateMovie = async (movieId, movieData) => {
    try {
        const response = await axiosInstance.put(`admin/updateMovie/${movieId}`, movieData, {
            headers: { "Content-Type": "application/json" }, // ✅ Send JSON instead of FormData
        });
        return response.data.data;
    } catch (error) {
        console.error("❌ Error updating movie:", error.response ? error.response.data : error.message);
        throw error;
    }
};