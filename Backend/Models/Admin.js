const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    AdminId: {
        type: Number,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    AdminPrivileges: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;