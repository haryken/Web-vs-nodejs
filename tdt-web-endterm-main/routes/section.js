const express = require("express");

const router = express.Router();

const sectionController = require("../controllers/sectionController");

router.post("/create", sectionController.createSection);

module.exports = router;