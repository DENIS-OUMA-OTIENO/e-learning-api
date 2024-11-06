const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: 'true'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',        
    }

}, { timestamps: true })
module.exports = mongoose.model('Subject', subjectSchema)