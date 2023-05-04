const express = require("express");
const router = express.Router();
const { getUserSocials } = require("../controllers/socials");

router.get("/:handle", getUserSocials)

module.exports = router;
