// controllers/foodController.js

const Food = require('../models/Food');

// Create a new food donation
exports.createFood = async (req, res) => {
  try {
    console.log('🍽️ Creating donation');
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const food = new Food({
      providerName: req.user.name,
      foodType: req.body.foodType,
      quantity: req.body.quantity,
      expiryTime: req.body.expiryTime,
      address: req.body.address,
      location: req.body.location,
      userId: req.user._id
    });

    await food.save();

    req.user.points = (req.user.points || 0) + 10;
    await req.user.save();

    res.status(201).json(food);
  } catch (err) {
    console.error('❌ Donation error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get nearby food donations based on geolocation
exports.getNearbyFood = async (req, res) => {
  try {
    const { lng, lat } = req.query;

    const foods = await Food.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 5000
        }
      }
    });

    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get donations made by the logged-in user
exports.getUserDonations = async (req, res) => {
  try {
    const foods = await Food.find({ userId: req.user._id });
    res.json({ donations: foods, points: req.user.points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
