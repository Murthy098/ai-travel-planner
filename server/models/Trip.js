const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  budget: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  interests: [String],
  itinerary: [{ day: Number, activities: [String] }],
  estimatedBudget: {
    flights: Number,
    accommodation: Number,
    food: Number,
    activities: Number,
    total: Number,
  },
  hotels: [{ name: String, type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);