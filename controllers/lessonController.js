const Lesson = require('../models/Lesson')
const asyncHandler = require('express-async-handler')

const createLesson = asyncHandler(async(req, res) => {
    const { title, text, date, teacher, subject, video, school, classroom } = req.body
    
    if(!title || !text || !date || !teacher || !subject || !classroom || !school) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const lessonObj = { title, text, date, teacher, subject, classroom, school, video }
    console.log(lessonObj)
    const newLesson = await Lesson.create(lessonObj)
    if(newLesson){
        return res.status(201).json({ message: 'lesson uploaded successfully' })
    } else{ 
        return res.status(400).json({ message: 'invalid lesson data' })
    }
})

const getAllLessons = asyncHandler(async(req, res) => {
    const lessons = await Lesson.find()

    if(!lessons){
        return res.status(400).json({ message: 'no lessons found' })
    }

    res.send(lessons)
})

const updateLesson = asyncHandler(async(req, res) => {
    const { id, title, text, date, teacher, subject, video, school, classroom } = req.body
    
    const lesson = await Lesson.findById(id).exec()
   
    lesson.title = title
    lesson.text = text
    lesson.date = date
    lesson.teacher = teacher
    lesson.subject = subject
    lesson.video = video
    lesson.school = school
    lesson.classroom = classroom

   
    const updatedLesson = await lesson.save()
    if(updatedLesson){
        return res.status(201).json({ message: 'subject updated successfully'})
    } else{
        return res.status(400).json({ message: 'invalid subject data'})
    }

})

module.exports = { createLesson, getAllLessons, updateLesson }