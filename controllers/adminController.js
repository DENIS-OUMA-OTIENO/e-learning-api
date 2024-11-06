const asyncHandler = require('express-async-handler')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

const getAdmin = asyncHandler(async(req, res) => {
    const admin = await Admin.find().select('-password').lean().exec()
    if(!admin?.length) {
       return res.status(400).json({ message: 'No admin found'})
    }

    res.send(admin)
})

module.exports = { getAdmin}