const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: Date
})

commentSchema.statics.createComment = async function (
    content,
    user,
    createdAt
) {
    try {

        let comment = await this.create({
            content,
            user,
            createdAt
        });

        comment = await comment.populate("user").execPopulate();

        return comment;

    } catch (error) {
        throw error;
    }
}

commentSchema.statics.updateComment = async function (
    id,
    content
) {
    try {

        let comment = await this.findOne({
            _id: id
        }).exec();

        comment.content = content;

        await comment.save();

        return comment;

    } catch (error) {
        throw error;
    }
}

commentSchema.statics.deleteComment = async function (
    id
) {    
    try {

        let result = await this.deleteOne({
            _id: id
        });

        if (result.deletedCount > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        throw error;
    }
}

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;