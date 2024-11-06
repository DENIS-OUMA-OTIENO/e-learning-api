const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').post(studentController.createStudent)
router.route('/').get(studentController.getStudents)
router.route('/').delete(studentController.deleteStudent)
router.route('/').put(studentController.updateExamResult)

module.exports = router
