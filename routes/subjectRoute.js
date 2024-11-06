const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subjectController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').post(subjectController.createSubject)
router.route('/').get(subjectController.getAllSubjects)
router.route('/').put(subjectController.updateSubject)
router.route('/:id').get(subjectController.getClassSubjects)

module.exports = router