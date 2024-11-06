const express = require('express')
const adminController = require('../controllers/adminController')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)


router.route('/')
        .get(adminController.getAdmin)
        

module.exports = router