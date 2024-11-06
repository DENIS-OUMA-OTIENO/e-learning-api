const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    video: {
        type: String,
        
    },
    date: {
        type: Date,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Lesson', lessonSchema)