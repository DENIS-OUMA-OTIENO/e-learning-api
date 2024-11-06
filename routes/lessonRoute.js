const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lessonController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').post(lessonController.createLesson)
router.route('/').get(lessonController.getAllLessons)
router.route('/').put(lessonController.updateLesson)

module.exports = router

