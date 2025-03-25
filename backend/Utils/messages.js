const Messages = {
    USER: {
        LOGIN_SUCCESS: "Logged in successfully",
        LOGIN_FAILED: "Login failed! Invalid credentials",
        SIGNUP_SUCCESS: "User registered successfully",
        SIGNUP_FAILED: "User registration failed",
        EMAIL_EXISTS: "Email already in use",
        EMAIL_REQUIRED: "Email is required",
        INVALID_EMAIL: "Invalid email format",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_WEAK: "Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols",
        PASSWORD_INCORRECT: "Incorrect password",
        USER_NOT_FOUND: "User not found",
        USER_ALREADY_EXISTS: "User with this email already exists",
        NO_USERS_FOUND: "No users found",
    },
    AUTH: {
        TOKEN_MISSING: "Authorization token is missing",
        TOKEN_INVALID: "Invalid or expired token",
        ACCESS_DENIED: "Access denied! Unauthorized user",
        SESSION_EXPIRED: "Your session has expired. Please log in again",
    },
    VALIDATION: {
        REQUIRED_FIELDS: "Please fill in all required fields",
        INVALID_INPUT: "Invalid input data",
        USERNAME_REQUIRED: "Username is required",
        EMAIL_INVALID: "The provided email format is incorrect",
        PASSWORD_SHORT: "Password must be at least 8 characters long",
    },
    SYSTEM: {
        SERVER_ERROR: "An unexpected error occurred. Please try again later",
        DATABASE_ERROR: "Database error. Please contact support",
        REQUEST_FAILED: "Request failed. Please check your input and try again",
    },
    BOOKING: {
        SUCCESS: "Booking successful!",
        FAILED: "Booking failed. Please try again",
        MOVIE_NOT_FOUND: "Movie not found",
        NOT_ENOUGH_TICKETS: "Not enough tickets available",
        PAYMENT_REQUIRED: "Payment method is required",
    },
    PAYMENT: {
        UPDATED: "Payment status updated successfully!",
        FAILED: "Payment update failed. Please try again",
        INVALID_STATUS: "Invalid payment status provided",
        SUCCESSFUL: "Payment successful",
        PENDING: "Payment pending",
    },
    ORDER: {
        FETCH_SUCCESS: "Orders fetched successfully!",
        FETCH_FAILED: "Failed to fetch orders. Please try again",
        ORDER_NOT_FOUND: "Order not found",
    },
    MOVIE: {
        FETCH_SUCCESS: "Movies fetched successfully",
        FOUND: "Movie found successfully",
        NOT_FOUND: "Movie not found",
    }
};

module.exports = Messages;
