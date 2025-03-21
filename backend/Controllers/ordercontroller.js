const Order = require("../Models/orders");
const Movie = require("../Models/movies");

const mongoose=require("mongoose")

// 🎟 Create a new booking

const createBooking = async (req, res) => {
    try {
        const { movieId } = req.params; // This movieId is coming from the URL params
        const { ticketsBooked, paymentMethod } = req.body;
        const userId = req.user.id; // Assuming userId is retrieved from the JWT token

        // Ensure that the movieId is passed correctly and convert it to ObjectId
        const movie = await Movie.findById(new mongoose.Types.ObjectId(movieId));  // Use MongoDB _id

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Check for available tickets
        if (movie.tickets.available < ticketsBooked) {
            return res.status(400).json({ message: "Not enough tickets available" });
        }

        // Calculate total amount
        const totalAmount = ticketsBooked * movie.pricing.pricePerTicket;

        // Create the booking order and ensure movieId is stored as ObjectId
        const order = new Order({
            userId,
            movieId: new mongoose.Types.ObjectId(movieId),  // Convert to ObjectId before saving
            ticketsBooked,
            totalAmount,
            paymentStatus: "pending",
            orderStatus: "confirmed",
            paymentMethod,
        });

        console.log("Booking Order:", order); // Debugging log

        // Save the order
        await order.save();

        // Update the available tickets in the movie document
        movie.tickets.available -= ticketsBooked;
        await movie.save();

        // Send the response with the order data
        res.status(201).json({
            message: "Booking successful",
            orderId: order._id, // Include the orderId in the response
            availableTickets: movie.tickets.available,
        });
    } catch (error) {
        console.error("Error booking ticket:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
};
const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.paymentStatus = status;
        if (status === "successful") {
            order.orderStatus = "completed"; // ✅ Mark order as completed

            const movie = await Movie.findById(order.movieId);
            if (!movie) return res.status(404).json({ message: "Movie not found" });

            movie.tickets.sold += order.ticketsBooked;
            movie.pricing.totalRevenue += order.totalAmount;
            await movie.save();
        }

        await order.save();
        res.status(200).json({ message: "Payment updated successfully!", order });
    } catch (error) {
        console.error("Payment Update Error:", error);
        res.status(500).json({ message: "Server error, please try again", error: error.message });
    }
};

// 🎟 Get all orders for the user
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from JWT token (assuming user is authenticated)

        // Find all orders for the user and populate movieId with movie details (title, genre, poster, etc.)
        const orders = await Order.find({ userId: userId })
            .populate('movieId', 'title genre poster language status'); // Populate movieId to get relevant movie details

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json({ orders }); // Send orders in the response
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Server error, please try again", error: error.message });
    }
};







module.exports = { createBooking, updatePaymentStatus,getUserOrders };
