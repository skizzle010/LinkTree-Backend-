const express =require('express')
const router = express.Router()
const {dashBoardData} =require('../controllers/dashboard')


router.post('/dashboard',dashBoardData)

module.exports = router;