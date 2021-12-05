const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    FlightNumber: { //KEY
        type: Number,
        required: true,
    },
    Cabin :{
        type: String,
        required:true,
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
    FirstClassSeats:{
        type: String,
        reqiored: true
    },
    Airport: {
        type: String,
        required: true
    },
    Cost: {
        type: Number,
        required: true
    },
    DepartureAirport:{
        type: String,
        require: true
    },
    ArrivalAirport:{
        type: String,
        require: true 
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;