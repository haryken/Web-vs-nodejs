const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/create", userController.createUser);

router.get("/create", userController.renderUserCreate);

router.post("/update", userController.updateUser);

router.get("/update", userController.renderUserUpdate);

router.get("/assign", userController.renderUserAssign);

router.post("/assign", userController.assignUser);

router.post("/sections", userController.getUserSections);

module.exports = router;