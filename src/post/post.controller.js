import { ApplicationError } from "../middlewares/ErrorHandling.js";
import { postRepository } from "./post.repository.js";

export class postController {
    constructor() {
        this.PostRepository = new postRepository();
    }

    async CreatePost(req, res, next) {
        try {
            const userid = req.userid;
            const postImage = "uploads/" + req.file.filename;
            const CreateStatus = await this.PostRepository.createPost(userid, postImage);
            if (!CreateStatus) {
                throw new ApplicationError(CreateStatus.message, CreateStatus.code)
            }
            res.status(200).json({ message: "Post Created Successfully...!!!", Post: CreateStatus });
        } catch (err) {
            next(err)
        }
    }
    // ----------------------------------------------------------------------------------------------

    async fincPostByid(req, res, next) {
        try {
            const { postId } = req.params;
            const postData = await this.PostRepository.retrivePostById(postId);
            if (!postData.success) {
                throw new ApplicationError(postData.message, postData.code)
            }
            res.status(200).send(postData.message);
        } catch (err) {
            next(err)
        }

    }
    // ----------------------------------------------------------------------------------------------
    async retriveUserAllPost(req, res, next) {
        try {
            const userId = req.userid;
            const userPost = await this.PostRepository.userAllPost(userId);
            if (!userPost.success) {
                throw new ApplicationError(userPost.message, userPost.code)
            }
            res.status(200).send({ message: userPost.message, Post_Data: userPost.data });
        } catch (err) {
            next(err)
        }
    }
    // ----------------------------------------------------------------------------------------------
    async updatePost(req, res, next) {
        try{
            const userid = req.userid;
            const {postId} = req.params;
            const UpdateImage="uploads/"+req.file.filename;
            const updateStatus=await this.PostRepository.updatePost(userid,postId,UpdateImage);
            if(!updateStatus.success){
                throw new ApplicationError(updateStatus.message,updateStatus.code);
            }
            res.status(200).send({message:updateStatus.message,Updated_Data:updateStatus.data})
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    // ----------------------------------------------------------------------------------------------
    async deletePost(req, res, next) {
        try {
            const userid = req.userid;
            const { postId } = req.params;
            const data = await this.PostRepository.deleteSpecificPost(userid, postId);
            if (!data.success) {
                throw new ApplicationError(data.message, data.code);
            }
            res.status(200).send({ Message: data.message, deleted_Post: data.data });
        } catch (err) {
            next(err);
        }
    }
}