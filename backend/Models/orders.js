const mongoose = require("mongoose");
const { nanoid } = require("nanoid"); // Correctly import nanoid

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, default: () => nanoid(), unique: true }, // ✅ Call nanoid to generate a unique orderId
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who placed the order
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }, // Movie booked, ensure this uses ObjectId
    ticketsBooked: { type: Number, required: true, min: 1 }, // Number of tickets booked
    totalAmount: { type: Number, required: true }, // Total price (ticketsBooked * pricePerTicket)
    paymentStatus: { 
      type: String, 
      enum: ["pending", "successful", "failed"], 
      default: "pending" // Tracks payment completion
    },
    orderStatus: { 
      type: String, 
      enum: ["confirmed", "cancelled", "completed"], 
      default: "confirmed" // Tracks if the order is completed or canceled
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
