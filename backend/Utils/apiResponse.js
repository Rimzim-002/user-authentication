class APIResponse {
    success(res, data = { status: 200, message: "OK", data: {} }) {
        return res.status(data.status).json(data);
    }

    error(res, data = {}) {
        const status = typeof data.status === "number" ? data.status : 500; // Default to 500
        const message = data.message || "Internal Server Error";
        const error = data.error || "Unknown error occurred";

        console.error(" API Error:", { status, message, error }); // Log the actual error

        return res.status(status).json({ status, message, error });
    }
}

module.exports = new APIResponse();
