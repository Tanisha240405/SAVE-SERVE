const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  providerName: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  address: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createdAt: { type: Date, default: Date.now }
});

donationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Donation', donationSchema);
