const {
    body,
    validationResult
} = require("express-validator");

const Comment = require("../models/Comment");

const mongoose = require("mongoose");


module.exports.createComment = [
    body("content").isLength({min: 1}).withMessage("Comment content must be specified"),
    async (req, res, next) => {
    try {

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

        return res.status(201).json(comment);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}]

module.exports.updateComment = async function (
    req, res, next
) {
    try {

        let {
            id
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Comment ObjectID is invalid"
            })
        }

        let {
            content 
        } = req.body;

        let comment = await Comment.updateComment(
            id,
            content
        )

        return res.json(comment);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports.deleteComment = async (req, res, next) => {
    try {

        let {
            id 
        } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                error: "Comment ObjectID is invalid"
            })
        }

        let result = await Comment.deleteComment(id);

        if (result) {
            return res.status(200).json({
                id
            })
        } else {
            throw new Error("Comment wasn't deleted")
        }

        
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}