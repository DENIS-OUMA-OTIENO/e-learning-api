const Student = require('../models/Student')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Classroom = require('../models/Classroom')



const createStudent = asyncHandler(async(req, res) => {
    const { name, classroom, studentNumber, gender, password, school } = req.body

   
    const hashedPwd = await bcrypt.hash(password, 10)
    const newStudentObj = { name, classroom, studentNumber,  gender, school, 'password': hashedPwd}

    const existingStudent = await Student.findOne({ studentNumber, school }).lean().exec()
    if(existingStudent){
        return res.status(400).json({ message: 'student already exist'})
    }

    const newStudent = await Student.create(newStudentObj)
    if(newStudent){
        return res.status(201).json({ message: 'student registered successfully'})
    } else{
        return res.status(400).json({ message: 'invalid student data'})
    }
})

const getStudents = asyncHandler(async(req, res) => {
    const students = await Student.find().select('-password').lean()

    if(!students?.length){
        return res.status(400).json({ message: 'No students found' })
    }

    const studentWithClass = await Promise.all(students.map(async (student) => {
        const classroom = await Classroom.findById(student.classroom).lean().exec()
        return { ...student, classroom: classroom.className }

    }))

      
    res.json(studentWithClass)
})

const getStudentDetail = asyncHandler(async(req, res) => {
    const student = await student.findById(req.params.id).select('-password')
    if(!student){
        return res.status(400).json({ message: 'No student found'})
    }

    res.send(student)
})

const deleteStudent = asyncHandler(async(req, res) => {
    
    const delStudent = await Student.findById(req.params.id).exec()

    if(!delStudent) {
        return res.status(400).json({ message: 'student not found' })
    }

    const result = await student.deleteOne()
    
    if(result){
        const delMessage = `${delStudent.name} deleted`
        res.json(delMessage)
    }
})
const updateExamResult = asyncHandler(async(req, res) => {
    const {subjectName, marksObtained } = req.body

    const existingStudent = await Student.findById(req.params.id).exec()
    
    if(!existingStudent){
        return res.status(400).json({ message: 'no student found' })
    }

    const existingSubject = existingStudent.assignmentResult.find(
        (result) => result.subjectName.toString() === subjectName
    )

    if(existingSubject){
        existingSubject.marksObtained = marksObtained
    } else{
        existingStudent.assignmentResult.push({ subjectName, marksObtained})
    }

    const updatedStudent = await existingStudent.save()
    res.send(updatedStudent)
})

module.exports = {createStudent, getStudents, getStudentDetail, deleteStudent, updateExamResult}