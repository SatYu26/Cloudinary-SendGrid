const express = require("express");

const router = express.Router();

const { emailFeedback } = require("../controllers/controller.js");

// routes

router.get("/", emailFeedback);

module.exports = router;
