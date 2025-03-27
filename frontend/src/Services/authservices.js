import axiosInstance from "../Utils/axiosinstance";
import MESSAGES from "../Utils/messages";
import Logger from "../Utils/logger";  // ✅ Import Logger
import API_ROUTES from "../Utils/apiroutes";

export const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, formData);
        Logger.log(MESSAGES.AUTH.LOGIN_SUCCESS, response.data); // ✅ Use Logger
        return response.data;
    } catch (error) {
        Logger.error(MESSAGES.AUTH.LOGIN_ERROR, error.response ? error.response.data.data : error.message); // ✅ Use Logger
        throw error;
    }
};

export const signupUser = async (formData) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.AUTH.SIGNUP, formData);
        Logger.log(MESSAGES.AUTH.SIGNUP_SUCCESS, response.data);
        return response.data;
    } catch (error) {
        Logger.error(MESSAGES.AUTH.SIGNUP_ERROR, error.response ? error.response.data.data : error.message);
        throw error;
    }
};
