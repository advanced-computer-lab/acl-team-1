const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    FlightNumber: {
        type: Number,
        required: true,
    },
    DepartureTime: {
        type: String,
        required: true,
    },
    ArrivalTime: {
        type: String,
        required: true,
    },
    DepartureDate: {
        type: String,
        required: true
    },
    ArrivalDate: {
        type: String,
        required: true
    },
    EconomySeats: {
        type: Number,
        required: true
    },
    BusinessClassSeats: {
        type: String,
        required: true
    },
    Airport: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;