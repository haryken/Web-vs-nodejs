const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares/auth");

const adminController = require("../controllers/adminController");


module.exports = router;