const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Teacher = require('../models/Teacher')

const createTeacher = asyncHandler(async(req, res) => {
    const {teacherNumber, teacherName, gender, password, school } = req.body

    if(!teacherNumber || !teacherName || !gender || !password || !school) {
        return res.status(400).json({ message: 'all fields are required'})
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const newTeacherObj = {teacherNumber, teacherName, gender, school, 'password': hashedPwd}

    const existingTeacher = await Teacher.findOne({ teacherNumber, school }).lean().exec()
    if(existingTeacher) {
        return res.status(400).json({ message: 'teacher already exist'})
    }

    const newTeacher = await Teacher.create(newTeacherObj)

    if(newTeacher){
        return res.status(200).json({ message: 'teacher created successfully' })
    } else {
        return res.status(400).json({ message: 'invalid teacher data' })
    }
})

const getTeachers = asyncHandler(async(req, res) => {
    const teachers = await Teacher.find().select('-password').lean()

    if(!teachers){
        return res.status(400).json({ message: 'no teacher found' })
    }

    res.send(teachers)
})

module.exports = {createTeacher, getTeachers}