const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

}, { timestamps: true })
module.exports = mongoose.model('Announcement', announcementSchema)