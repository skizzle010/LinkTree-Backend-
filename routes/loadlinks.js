const express = require('express');
const router = express.Router();

const {loadLinks} = require('../controllers/loadlinks');

router.post('/links',loadLinks);

module.exports = router;