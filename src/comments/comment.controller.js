import { ApplicationError } from "../middlewares/ErrorHandling.js";
import { commentRepository } from "./comment.repository.js"
import { ObjectId } from "mongodb";
export class commentController {
    constructor() {
        this.commentRepo = new commentRepository();
    }
    async AddComment(req, res, next) {
        try {
            const userid = req.userid;
            const { postId } = req.params;
            const { comments } = req.body;
            const postid = new ObjectId(postId);
            const commentAddStatus = await this.commentRepo.addComment(userid, postid, comments);
            if (!commentAddStatus.success) {
                throw new ApplicationError(commentAddStatus.message, commentAddStatus.code)
            }
            res.status(200).send({ Comment: commentAddStatus.data });
        } catch (err) {
            next(err)
        }
    };

    async GetComment(req, res, next) {
        try {
            const { postId } = req.params;
            const postid = new ObjectId(postId);
            const getCommentStaus = await this.commentRepo.getComment(postid);
            if (!getCommentStaus.success) {
                throw new ApplicationError(getCommentStaus.message, getCommentStaus.code)
            }
            res.status(200).send({ Comment_data: getCommentStaus.data });
        } catch (err) {
            next(err)
        }
    };
    async UpdateComment(req,res,next){
        try {
            const { commentId } = req.params;
            const {postID,text}=req.body;
            const userid=req.userid;
            const updateCommentStaus = await this.commentRepo.updateComment(commentId,postID,text,userid);
            if (!updateCommentStaus.success) {
                throw new ApplicationError(updateCommentStaus.message, updateCommentStaus.code)
            }
            res.status(200).send({ message:updateCommentStaus.message,Update_Comment_data: updateCommentStaus.data });
        } catch (err) {
            next(err)
        }
    }

    async DeleteComment(req,res,next) {
        try {
            const { commentId } = req.params;
            const {postID}=req.body;
            const userid=req.userid;
            const commentid = new ObjectId(commentId);
            const deleteCommentStaus = await this.commentRepo.deleteComment(commentid,postID,userid);
            if (!deleteCommentStaus.success) {
                throw new ApplicationError(deleteCommentStaus.message, deleteCommentStaus.code)
            }
            res.status(200).send({ message:deleteCommentStaus.message,Deleted_Comment_data: deleteCommentStaus.data });
        } catch (err) {
            next(err)
        }
    };
}
