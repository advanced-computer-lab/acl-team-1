const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  HomeAddress: {
    type: String,
    required: true
  },
  CountryCode: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  PassportNumber: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;