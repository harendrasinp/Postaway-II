import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";
import { signupModel } from "../user/user.repository.js";
import { ObjectId } from "mongodb";
export const postModel = mongoose.model("Post", postSchema);

export class postRepository {
    async createPost(userid, image) {
        try {
            const postData = {
                userid,
                image
            }
            const createPost = await postModel(postData).save();
            const userArray = await signupModel.findById(userid);
            userArray.post.push(createPost._id);
            await userArray.save();
            return createPost
        } catch (err) {
            return { success: false, message: "Something Went Wrong", code: 500 };
        }
    }
    // ----------------------------------------------------------------------------------------------------
    async retrivePostById(postId) {
        const post = await postModel.findById(postId).populate("userid", { name: 1 });
        if (!post) {
            return { success: false, message: "No Post Found By this ID Try with Rigth Id", code: 403 }
        }
        return { success: true, message: post }
    }
    // -----------------------------------------------------------------------------------------------------
    async userAllPost(userId) {
        const UserID = new ObjectId(userId)
        const allPost = await postModel.find({ userid: UserID });
        if (!allPost || allPost.length == 0) {
            return { success: false, message: "Still You have not created Any Post...!!!", code: 403 }
        }
        return { success: true, message: "All Post Fetched Successfully.....!!!", data: allPost };
    }
    // -------------------------------------------------------------------------------------------------------
    async updatePost(userid,postId,UpdateImage){
        const userId = new ObjectId(userid)
        const postID = new ObjectId(postId);

       const updateData=await postModel.findOneAndUpdate(
            {userid:userId,_id:postID},
            {image:UpdateImage},
            {new:true}
        );
        if(!updateData){
            return {success: false, message: "Something wend Wrong with Update Process...!!!", code: 403}
        }
        return {success:true,message:"Post Updated Successfully.....!!!",data:updateData};
    }
    //--------------------------------------------------------------------------------------------------------
    async deleteSpecificPost(userid, postId) {
        const userId = new ObjectId(userid)
        const postID = new ObjectId(postId);
        const deletedPost = await postModel.findOneAndDelete({ userid: userId, _id: postID });
        if (!deletedPost) {
            return { success: false, message: "Post Id Not Matched", code: 403 }
        }
        await signupModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { post: postID } },
            { new: true }
        );
        return { success: true, message: "Post Deleted Successfully....!!!", data: deletedPost }
    }
}