const express = require("express");
const { getUserData } = require("../controllers/[handle]");
const router = express.Router();

router.get("/:handle", getUserData);

module.exports = router;