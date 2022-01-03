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
        type: Number,
        required: true
    },
    FirstClassSeats:{
        type: Number,
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
    },
    TripDuration:{
        type:Number
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;