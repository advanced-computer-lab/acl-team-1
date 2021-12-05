const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  FlightNumber: {
    type: Number,
    required: true,
  },
  PassportNumber: {
    type: Number,
    required: true
  },
  FlightCost: {
    type: Number,
    required: true
  },
  SeatNumber: {
    type: String,
    required: true
  },
  Cabin: {
    type: String,
    required: true
  },
  BookingNumber: { //KEY
    type: Number,
    required: true
  }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;