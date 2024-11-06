const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
    
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Classroom', roomSchema)
