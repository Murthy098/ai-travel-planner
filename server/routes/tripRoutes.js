const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Trip = require('../models/Trip');
const { generateItinerary } = require('../controllers/aiController');

// Create new trip
router.post('/', protect, async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;
    const aiData = await generateItinerary(destination, days, budget, interests);
    const trip = await Trip.create({
      user: req.user.id,
      destination,
      days,
      budget,
      interests,
      itinerary: aiData.itinerary,
      estimatedBudget: aiData.estimatedBudget,
      hotels: aiData.hotels,
    });
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all trips for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single trip
router.get('/:id', protect, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete trip
router.delete('/:id', protect, async (req, res) => {
  try {
    await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;