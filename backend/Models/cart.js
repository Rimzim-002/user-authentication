const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // User who selected/booked the movie
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Movies", 
    required: true 
  }, // Selected movie
  quantity: { 
    type: Number, 
    required: true 
  }, // Number of tickets booked
  ticketPrice: { 
    type: Number, 
    required: true 
  }, // Price per ticket
  totalPrice: { 
    type: Number, 
    required: true 
  }, // Total cost (quantity * ticketPrice)
  status: { 
    type: String, 
    enum: ["selected", "booked"], 
    default: "selected" 
  }, // Status: 'selected' (in cart) or 'booked' (confirmed)
  addedAt: { 
    type: Date, 
    default: Date.now 
  } // Timestamp for cart addition
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
