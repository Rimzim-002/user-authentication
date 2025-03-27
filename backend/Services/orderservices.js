// services/orderService.js
const Order = require("../Models/orders.js");
const Movie = require("../Models/movies.js");

const createBookingService = async (userId, ticketsBooked, paymentMethod, movieId) => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return { error: "Movie not found" };

        if (movie.tickets.available < ticketsBooked) {
            return { error: "Not enough tickets available" };
        }

        const totalAmount = ticketsBooked * movie.pricing.pricePerTicket;

        const order = new Order({
            userId,
            movieId,
            ticketsBooked,
            totalAmount,
            paymentStatus: "pending",
            orderStatus: "confirmed",
            paymentMethod,
        });

        await order.save();

        movie.tickets.available -= ticketsBooked;
        await movie.save();

        return { success: true, orderId: order._id, availableTickets: movie.tickets.available };
    } catch (error) {
        return { error: error.message };
    }
};

const updatePaymentStatusService = async (orderId, status) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) return { error: "Order not found" };

        order.paymentStatus = status;
        if (status === "successful") {
            order.orderStatus = "completed";
            const movie = await Movie.findById(order.movieId);
            if (!movie) return { error: "Movie not found" };
            
            movie.tickets.sold += order.ticketsBooked;
            movie.pricing.totalRevenue += order.totalAmount;
            await movie.save();
        }
        await order.save();
        return { success: true, order };
    } catch (error) {
        return { error: error.message };
    }
};

const getUserOrdersService = async (userId) => {
    try {
        const orders = await Order.find({ userId }).populate("movieId"); // ✅ Populate movie details
        if (!orders.length) return { error: "No orders found" };
        return { success: true, orders };
    } catch (error) {
        return { error: error.message };
    }
};


module.exports = { createBookingService, updatePaymentStatusService, getUserOrdersService };
