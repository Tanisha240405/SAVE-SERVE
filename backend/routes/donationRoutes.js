const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// POST: Create a donation
router.post('/', async (req, res) => {
  try {
    console.log('🛎️ Incoming donation request:', req.body);

    const donation = new Donation(req.body);
    await donation.save();

    res.status(201).json({ message: 'Donation posted successfully.' });
  } catch (err) {
    console.error('❌ Error creating donation:', err.message);
    res.status(500).json({ message: 'Error creating donation.', error: err.message });
  }
});

// GET: All donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donations.', error: err.message });
  }
});

module.exports = router;
