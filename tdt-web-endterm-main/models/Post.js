const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    imageUrl: String,
    youtubeUrl: String,
    createdAt: Date,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

postSchema.statics.getAllPosts = async function (page, user) {
    try {

        let posts;

        if (mongoose.isValidObjectId(user) && user ) {
            posts = await this.find({
                user: user
            })
            .populate("user")
            .populate("comments")
            .populate({
                path: "comments",
                populate: { path: "user" }
            })
            .exec();
        } else {
            posts = await this.find({})
                .populate("user")
                .populate("comments")
                .populate({
                    path: "comments",
                    populate: { path: "user" }
                })
                .exec();

        }



        posts.sort((firstPost, secondPost) => {
            let firstPostTotal = new Date(firstPost.createdAt).getTime();
            let secondPostTotal = new Date(secondPost.createdAt).getTime();
    
            return secondPostTotal - firstPostTotal;
        })

        page = Number.parseInt(page);

        if (!page) {
            page = 0;
        }

        posts = posts.slice(page * 10, (page + 1) * 10);
        
        return posts;
        
    } catch (error) {
        throw error;
    }
}

postSchema.statics.getPostDetail = async function (
    id
) {
    try {


        let post = await this.findOne({
            _id: id
        }).exec();

        return post;

    } catch (error) {
        throw error;
    }
}

postSchema.statics.createPost = async function (
    content,
    user,
    createdAt,
    imageUrl,
    youtubeUrl
) {
    try {

        let post = await this.create({
            content,
            user,
            createdAt,
            imageUrl,
            youtubeUrl
        });

        post = await post.populate("user").execPopulate();

        console.log(post);

        return post;

    } catch (error) {
        throw error;
    }
}

postSchema.statics.updatePost = async function (
    id,
    content,
    imageUrl,
    youtubeUrl,
) {
    try {

        let post = await this.findOne({
            _id: id
        }).exec();

        if (post) {

            if (content) {
                post.content = content;
            }

            if (imageUrl) {
                post.imageUrl = imageUrl;
            }

            if (youtubeUrl) {
                post.youtubeUrl = youtubeUrl;
            }

            await post.save();

            return post;

        } else {
            throw new Error("Post doesn't exist")
        }

    } catch (error) {
        throw error;
    }
}

postSchema.statics.deletePost = async function (
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

postSchema.statics.addComment = async function (
    postId,
    commentId
) {
    try {

        let post = await this.findOne({
            _id: postId
        }).exec();

        if (post) {
            post.comments = [...post.comments, commentId];

        }

        await post.save();

        return post.comments;

    } catch (error) {
        throw error;
    }
}

postSchema.statics.removeComment = async function (
    postId,
    commentId,
) {
    try {

        let post = await this.findOne({
            _id: postId
        }).exec();

        if (post) {

            post.comments = post.comments.filter((comment) => comment._id !== commentId);

        }

        await post.save();

        return post.comments;
        
    } catch (error) {
        throw error;
    }
}

postSchema.statics.getUserPosts = async function (
    userId
) {
    try {

        let posts = await this.find({
            user: userId
        })
        .populate("user")
        .populate("comments")
        .populate({
            path: "comments",
            populate: { path: "user" }
        })
        .exec();

        posts.sort((firstPost, secondPost) => {
            let firstPostTotal = new Date(firstPost.createdAt).getTime();
            let secondPostTotal = new Date(secondPost.createdAt).getTime();
    
            return secondPostTotal - firstPostTotal;
        })

        posts = posts.slice(0, 10);

        return posts;

    } catch (error) {
        throw error;
    }
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;