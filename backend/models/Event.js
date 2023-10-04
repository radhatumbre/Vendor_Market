const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventTitle: String,
  description: String,
  location: String,
  eventPrice: Number,
  eventRating: Number, 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
