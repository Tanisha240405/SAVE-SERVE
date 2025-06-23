const express = require('express');
const router = express.Router();
const { createFood, getNearbyFood, getUserDonations } = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');

// All donation-related logic here
router.post('/', protect, createFood);
router.get('/nearby', getNearbyFood);
router.get('/my-donations', protect, getUserDonations);

module.exports = router;
