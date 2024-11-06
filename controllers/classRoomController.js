const asyncHandler = require('express-async-handler')
const classRoom = require('../models/Classroom')

const createClass = asyncHandler(async(req, res) => {
    const { className, school } = req.body
    
    
    
    const existingClass = await classRoom.findOne({ className, school }).lean().exec()
    if(existingClass) {
        return res.status(400).json({ message: 'class already exist'})
    }

    const classObject = { className, school }
    const newClass = await classRoom.create(classObject)

    if(newClass){
        return res.status(201).json({ message: `${newClass} class created`})
    } else {
        return res.status(400).json({ message: 'Invalid class data'})
    }
})
const getClassList = asyncHandler(async(req, res) => {
    let classes = await classRoom.find()
            
    if(!(classes?.length)){
        return res.status(400).json({ message: 'No classes found'})
    } 

    res.send(classes)
})

const getClassDetails = asyncHandler(async(req, res) => {
    let classDetails = await classRoom.findById(req.params.id)
    
    if(!classDetails) {
        return res.status(400).json({ message: 'No class found' })
    } else {
        classDetails = await classRoom.populate('school', 'schooName')
        res.send(classDetails)   
}})

const deleteClass = asyncHandler(async(req, res) => {

    const delClass = await classRoom.findById(req.params.id).exec()
    if(!delClass){
        return res.status(400).json({ message: 'No class found' })
    }

    const result = await classRoom.deleteOne()

    if(result){
        const message = `${delClass.className} deleted`
        res.send(message)
    }

    
})

module.exports = {createClass, getClassList, getClassDetails, deleteClass}