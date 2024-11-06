const express = require('express')
const router = express.Router()
const classRoomController = require('../controllers/classRoomController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').post(classRoomController.createClass)
router.route('/').get(classRoomController.getClassList)
router.route('/:id').get(classRoomController.getClassDetails)
router.route('/:id').delete(classRoomController.deleteClass)


module.exports = router