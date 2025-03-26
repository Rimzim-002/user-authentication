const Messages = require("../Utils/messages.js");
const Response = require("../Utils/apiResponse.js");
const { createBookingService, updatePaymentStatusService, getUserOrdersService } = require("../Services/orderservices.js");

// 🎟 Controller for creating a new booking
const createBooking = async (req, res) => {
    try {
        const { ticketsBooked, paymentMethod, movieId } = req.body;
        const userId = req.user.id;

        const result = await createBookingService(userId, ticketsBooked, paymentMethod, movieId);
        if (result.error) {
            return Response.error(res, { status: 400, message: result.error });
        }

        return Response.success(res, {
            status: 201,
            message: "Booking successful",
            orderId: result.orderId,
            availableTickets: result.availableTickets,
        });
    } catch (error) {
        console.error("Error booking ticket:", error);
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR });
    }
};

// 🎟 Controller for updating payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { status, orderId } = req.body;

        const result = await updatePaymentStatusService(orderId, status);
        if (result.error) {
            return Response.error(res, { status: 404, message: result.error });
        }

        return Response.success(res, { status: 200, message: "Payment updated successfully!", data: result.order });
    } catch (error) {
        console.error("Payment Update Error:", error);
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR });
    }
};

// 🎟 Controller for fetching all user orders
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await getUserOrdersService(userId);

        if (result.error) {
            return Response.error(res, { status: 404, message: result.error });
        }

        return Response.success(res, { status: 200, message: Messages.ORDER.FETCH_SUCCESS, data: result.orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return Response.error(res, { status: 500, message: Messages.SYSTEM.SERVER_ERROR });
    }
};

module.exports = { createBooking, updatePaymentStatus, getUserOrders };
