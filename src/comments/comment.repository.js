import { postModel } from "../post/post.repository.js";
import { signupModel } from "../user/user.repository.js";
import { commentModel } from "./comment.schema.js";
import { ObjectId } from "mongodb";
export class commentRepository {

    async addComment(userId, postId, comments) {
        const isPost = await postModel.findById(postId);
        if (!isPost) {
            return { success: false, message: "Post ID not matched to any Post, please Enter Right Post ID", code: 403 }
        }
        const newComment = {
            userId,
            postId,
            comments
        }
        const addedComment = await commentModel(newComment);
        await addedComment.save();

        const post = await postModel.findByIdAndUpdate(
            postId,
            { $push: { comments: addedComment._id } },
            { new: true }
        )
        return { success: true, message: "Comment added SuccessFull..!!!", data: addedComment }
    }
    async getComment(postId) {
        const comment = await postModel.findById(postId);
        if (!comment) {
            return { success: false, message: "Post ID not matched to any Post, please Enter Right Post ID to see comments", code: 403 }
        }
        const commentData = await postModel.findById(postId).populate("comments", { userId: 1, comments: 1 });
        return { success: true, message: "Get Comments  DataSuccessFull..!!!", data: commentData }
    }
    async updateComment(commentId,postID,text,userid){
        const findUser = await signupModel.findOne({ _id: userid, post: postID });
        if (!findUser) {
            return { success: false, message: "You are Not able to Update this Comment", code: 403 }
        }
        const isComment = await commentModel.findById(commentId);
        if (!isComment) {
            return { success: false, message: "Comment ID not matched to any Commment Data, please Enter Right Comment ID to Update comment", code: 403 }
        }
        const updateComment = await commentModel.findByIdAndUpdate(
            commentId,
            {comments:text},
            {new:true}
        );
        return { success: true, message: "Comment  Updated SuccessFull..!!!", data: updateComment}   
    }

    async deleteComment(commentid, postID, userid) {
        const findUser = await signupModel.findOne({ _id: userid, post: postID });
        if (!findUser) {
            return { success: false, message: "You are Not able to delete this Comment", code: 403 }
        }
        const isComment = await commentModel.findById(commentid);
        if (!isComment) {
            return { success: false, message: "Comment ID not matched to any Commment Data, please Enter Right Comment ID to Delete comment", code: 403 }
        }
        const deletedComment = await commentModel.findByIdAndDelete(commentid);
        await postModel.findByIdAndUpdate(
            postID,
            { $pull: { comments: commentid } },
            { new: true }
        )
        return { success: true, message: "Comment  Deleted SuccessFull..!!!", data: deletedComment }
    }
}
