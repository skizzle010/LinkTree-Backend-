const express = require('express');
const router = express.Router();

const {saveLinks} = require('../controllers/saveItems');

router.post('/links',saveLinks);

module.exports = router;