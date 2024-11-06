const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema(
{
    school: {
        type: String,
        unique: true,
        required: true
    },

    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'Admin'
    },

}
)
module.exports = mongoose.model('Admin', adminSchema)