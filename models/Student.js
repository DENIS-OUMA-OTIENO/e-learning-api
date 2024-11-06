const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
    studentNumber: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: false,
    },

    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
        
    },

    role: {
        type: String,
        default: 'Student'
    },

    assignmentResult: [
        {
            subjectName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject'
            },

            marksObtained: {
                type: Number,
                default: 0,
            }
        }
    ],
    attendance: [
        {
            date: {
                type: Date,
                required: true
            },

            status: {
                type: String,
                enum: ['Present', 'Absent'],
                required: true
            },
            subjectName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
                required: true
            }
        }
    ]
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Student', studentSchema)