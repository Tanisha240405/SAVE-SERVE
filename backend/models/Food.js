const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  providerName: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

foodSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Food', foodSchema);
