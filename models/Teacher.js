const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    teacherNumber: {
        type: String,
        required: true

    },

    teacherName: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Teacher'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    
    
}, { timestamps: true })

module.exports = mongoose.model('Teacher', teacherSchema)