import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    }],
    comments: {
        type: String,
        required: true
    }
});

export const commentModel = new mongoose.model("Comment", commentSchema)