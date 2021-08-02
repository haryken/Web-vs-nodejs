const Post = require("../models/Post")
const Comment = require("../models/Comment");

const {
    body,
    validationResult
} = require("express-validator");

const mongoose = require("mongoose");

const multerConfig = require("../config/multer");
const multer = require("multer");
const User = require("../models/User");

const upload = multer({
    storage: multerConfig.storage
});

module.exports.getAllPosts = async (req, res, next) => {
    try {

        let {
            page,
            user,
        } = req.query;

        let posts = await Post.getAllPosts(page, user);

        return res.status(200).json(posts);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.getPostDetail = async (req, res, next) => {
    try {

        let {
            id
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Invalid Post ID"
            })
        }

        let post = await Post.getPostDetail(id);

        return res.status(200).json(post);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.createPost = [
    upload.single("postPicture"),
    async (req, res, next) => {
        
        try {

            let {
                content,
                imageUrl,
                youtubeUrl
            } = req.body;

            if (req.file) {
                imageUrl = req.file.path.slice(6);
            }

            let post = await Post.createPost(
                content,
                req.session.user._id,
                new Date(),
                imageUrl,
                youtubeUrl
            );

            return res.status(200).json(post);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
        
}]

module.exports.updatePost = [
    upload.single("postPicture"),
    async (req, res, next) => {
        try {

            let {
                id 
            } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({
                    error: "Invalid Post ID"
                })
            }

            let {
                content,
                imageUrl,
                youtubeUrl,
            } = req.body;

            if (req.file) {
                imageUrl = req.file.path.slice(6);
            }


            let post = await Post.updatePost(
                id,
                content,
                imageUrl,
                youtubeUrl
            );

            return res.status(200).json(post);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
}]

module.exports.deletePost = async (req, res, next) => {
    try {

        let {
            id
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Invalid Post ID"
            })
        }

        let result = await Post.deletePost(id);

        if (result) {
            return res.status(200).json({ id });
        } else {
            throw new Error("No post was deleted")
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.addComment = [
    
    body("content").isLength({ min: 1}).withMessage("Comment content must be specified"),
    async (req, res, next) => {
        try {

            let {
                id
            } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({
                    error: "There are no posts associated with this id"
                })
            }

            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array()[0].msg
                })
            }

            let {
                content,
            } = req.body;

            let comment = await Comment.createComment(
                content,
                req.session.user._id,
                new Date()
            );

            let comments = await Post.addComment(
                id,
                comment._id
            );

            return res.status(200).json(comment);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
}]

module.exports.removeComment = async (req, res, next) => {
    try {

        let {
            id
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "There are no posts associated with this id"
            })
        }

        let {
            commentId
        } = req.body;

        let result = await Comment.deleteComment(commentId);

        let comments = await Post.removeComment(
            id,
            commentId
        )

        if (result) {
            return res.status(200).json({
                commentId
            })
        } else {
            throw new Error("Can't delete comment")
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.renderUserPosts = async (req, res, next) => {
    try {

        let user = req.session.user;

        let {
            id
        } = req.params;

        let posts = await Post.getUserPosts(id);

        let userDetail = await User.getUserDetail(id);

        return res.render("user-view", {
            user,
            posts,
            userDetail
        })

    } catch (error) {
        console.log(error);
    }
}