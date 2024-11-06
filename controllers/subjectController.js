const Subject = require('../models/Subject')
const Classroom = require('../models/Classroom')
const asyncHandler = require('express-async-handler')

const createSubject = asyncHandler(async(req, res) => {

    const { subjectName, subjectCode, classroom, school, teacher } = req.body


    if( !subjectName || !subjectCode || !classroom || !school ) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const existingSubject = await Subject.findOne({ subjectCode, classroom }).lean().exec()
    if(existingSubject){
        return res.status(400).json({ message: 'subject already exist'})
    }

    const subjectObj = {subjectCode, subjectName, classroom, teacher, school}

    const newSubject = await Subject.create(subjectObj)
    if(newSubject){
        return res.status(201).json({ message: 'subject created successfully'})
    } else{
        return res.status(400).json({ message: 'invalid subject data'})
    }}
)
const getAllSubjects = asyncHandler(async(req, res) => {
    const subjects = await Subject.find()

    if(!subjects.length){
        return res.status(400).json({ message: 'No subjects found'})
    }

    res.send(subjects)
})

const getSubjectDetails = asyncHandler(async(req, res) => {
    const subjectDetails = await Subject.findById(id).exec()
    res.send(subjectDetails)

})

const getClassSubjects = asyncHandler(async(req, res) => {
     const { id } = req.body
     
    const subjects = await Subject.findById(id).exec()

    if(!subjects?.length){
        return res.status(400).json({ message: 'No subjects found'})
    }


    res.send(subjects)
})

const updateSubject = asyncHandler(async(req, res) => {
    const { id, subjectName, subjectCode, classroom, teacher, school } = req.body
    
    const subject = await Subject.findById(id).exec()
   
    


    // if( !subjectName || !subjectCode || !classroom ) {
    //     return res.status(400).json({ message: 'all fields are required' })
    // }

    subject.subjectCode = subjectCode
    subject.subjectName = subjectName
    subject.classroom = classroom
    subject.teacher = teacher
    subject.school = school

   
    const updatedSubject = await subject.save()
    if(updatedSubject){
        return res.status(201).json({ message: 'subject updated successfully'})
    } else{
        return res.status(400).json({ message: 'invalid subject data'})
    }

}

)

module.exports = {updateSubject, createSubject, getAllSubjects, getClassSubjects, getSubjectDetails}