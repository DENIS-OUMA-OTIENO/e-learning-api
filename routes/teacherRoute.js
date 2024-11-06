const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacherController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').post(teacherController.createTeacher)
router.route('/').get(teacherController.getTeachers)

module.exports = router