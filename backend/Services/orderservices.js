const Order = require("../Models/orders");
const Movie = require("../Models/movies");
const mongoose = require("mongoose");

// ✅ Create Booking Service
const createBookingService = async (userId, movieId, ticketsBooked, paymentMethod) => {
    try {
        const movie = await Movie.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(movieId) } },
            { $project: { availableTickets: 1, title: 1 } },
        ]);

        if (!movie.length) {
            return { error: "Movie not found" };
        }

        if (movie[0].availableTickets < ticketsBooked) {
            return { error: "Not enough tickets available" };
        }

        // Create order
        const order = await Order.create({
            userId: new mongoose.Types.ObjectId(userId),
            movieId: new mongoose.Types.ObjectId(movieId),
            ticketsBooked,
            paymentMethod,
            paymentStatus: "pending",
        });

        // Update available tickets
        await Movie.updateOne(
            { _id: new mongoose.Types.ObjectId(movieId) },
            { $inc: { availableTickets: -ticketsBooked } }
        );

        return { orderId: order._id, availableTickets: movie[0].availableTickets - ticketsBooked };
    } catch (error) {
        console.error("Error in createBookingService:", error);
        return { error: "Failed to create booking" };
    }
};

// ✅ Update Payment Status Service
const updatePaymentStatusService = async (orderId, status) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus: status },
            { new: true }
        );

        if (!updatedOrder) {
            return { error: "Order not found" };
        }

        return { order: updatedOrder };
    } catch (error) {
        console.error("Error in updatePaymentStatusService:", error);
        return { error: "Failed to update payment status" };
    }
};

// ✅ Get User Orders using Aggregation
const getUserOrdersService = async (userId) => {
    try {
        const orders = await Order.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "movies",
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movieDetails",
                },
            },
            { $unwind: "$movieDetails" },
            {
                $project: {
                    _id: 1,
                    ticketsBooked: 1,
                    paymentMethod: 1,
                    paymentStatus: 1,
                    createdAt: 1,
                    "movieDetails.title": 1,
                    "movieDetails.genre": 1,
                    "movieDetails.releaseDate": 1,
                },
            },
        ]);

        if (!orders.length) {
            return { error: "No orders found for this user" };
        }

        return { orders };
    } catch (error) {
        console.error("Error in getUserOrdersService:", error);
        return { error: "Failed to fetch user orders" };
    }
};

module.exports = {
    createBookingService,
    updatePaymentStatusService,
    getUserOrdersService,
};
