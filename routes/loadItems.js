const express = require('express');
const router = express.Router();

const {loadLinks} =require('../controllers/loadItems')

router.post('/links',loadLinks);

module.exports = router;