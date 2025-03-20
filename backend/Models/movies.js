const mongoose = require("mongoose");
const moment = require("moment");
const { nanoid } = require("nanoid");

const movieSchema = new mongoose.Schema({
    movieId: { type: String, default: () => nanoid(10), unique: true },
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    genre: { type: [String], required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    poster: { type: String, required: true }, 
    trailer: { type: String, required: true }, 
    runtime: { type: Number, required: true }, 
    country: { type: String, required: true },
    language: { type: String, required: true },
    production: { type: String, required: true },
    
    status: { 
        type: String, 
        required: true, 
        enum: ["upcoming", "now_playing"], 
        default: "upcoming" 
    },

    tickets: { 
        total: { type: Number, required: true, min: 0 }, 
        available: { type: Number, required: true, min: 0 }, 
        sold: { type: Number, default: 0 } 
    },

    pricing: { 
        pricePerTicket: { type: Number, required: true, min: 0 }, 
        totalRevenue: { type: Number, default: 0 } 
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, // ✅ Superadmin ID
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ✅ Superadmin ID on update

}, { timestamps: true }); // ✅ `createdAt` and `updatedAt` managed automatically

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;




// {
//   "title": "The Shawshank Redemption",
//   "year": 1994,
//   "genre": ["Drama"],
//   "rating": 9.3,
//   "director": "Frank Darabont",
//   "actors": ["Tim Robbins", "Morgan Freeman"],
//   "plot": "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
//   "poster": "https://fakeimg.pl/220x310/ff0000",
//   "trailer": "https://example.com/shawshank_redemption_trailer.mp4",
//   "runtime": 142,
//   "awards": "Nominated for 7 Oscars",
//   "country": "USA",
//   "language": "English",
//   "boxOffice": "$28.3 million",
//   "production": "Columbia Pictures",
//   "website": "http://www.warnerbros.com/movies/shawshank-redemption",
//   "showtimes": [
//       { "theater": "Cineplex 1", "date": "2025-03-15", "time": "19:00", "price": 12.99 },
//       { "theater": "IMAX 3D", "date": "2025-03-16", "time": "21:30", "price": 15.99 }
//   ],
//   "bookings": [
//       { "user": "65f6b1c8e1d2d4f5a6b7c8d9", "seats": ["A1", "A2"], "paymentStatus": "Completed" }
//   ]
// }
