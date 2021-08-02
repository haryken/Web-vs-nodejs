const express = require("express");

const router = express.Router();

const commentController = require("../controllers/commentController");

router.post("/create", commentController.createComment);

router.post("/:id/update", commentController.updateComment);

router.post("/:id/delete", commentController.deleteComment);

module.exports = router;