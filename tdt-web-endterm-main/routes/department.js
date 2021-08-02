const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares/auth");

const departmentController = require("../controllers/departmentController");

module.exports = router;