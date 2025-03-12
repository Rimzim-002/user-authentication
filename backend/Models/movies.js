const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  duration: { type: Number }, // in minutes
  language: { type: String },
  poster: { type: String }, // URL to movie poster
  releaseDate: { type: Date },
  price: { type: Number, required: true }, // Ticket price
});

const Movies = mongoose.model("Movies", MoviesSchema);
module.exports = Movies;
