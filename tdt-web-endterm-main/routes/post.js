const express = require("express");

const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);

router.get("/users/:id", postController.renderUserPosts);

router.post("/:id/comment/add", postController.addComment)

router.post("/:id/comment/remove", postController.removeComment);

router.get("/:id", postController.getPostDetail);

router.post("/create", postController.createPost);

router.post("/:id/update", postController.updatePost);

router.post("/:id/delete", postController.deletePost);



module.exports = router;