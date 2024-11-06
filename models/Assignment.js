const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: String
    },
    class: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
})

module.exports = mongoose.model('Assignment', assignmentSchema)