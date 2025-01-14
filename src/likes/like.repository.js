import { postModel } from "../post/post.repository.js";
import { commentModel } from "../comments/comment.schema.js";


export class likeRepository {
    async likePost(userid, postid) {
        const post = await postModel.findById(postid);
        if (!post) {
            return { success: false, message: "Post Id Not Matched", code: 403 }
        }
        const likestatus = post.likes.includes(userid);
        if (likestatus) {
            await postModel.findByIdAndUpdate(
                postid,
                {$pull:{likes:userid}},
                {new:true}
            )
            return { success: true, message: "Unliked SuccessFull..!!!", }
        }
        post.likes.push(userid)
        await post.save();
        return { success: true, message: "leked SuccessFull..!!!", }
    }

    async likeComment(userid,commentId){
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return { success: false, message: "Post Id Not Matched", code: 403 }
        }
        const likestatus = comment.likes.includes(userid);
        if (likestatus) {
            await commentModel.findByIdAndUpdate(
                commentId,
                {$pull:{likes:userid}},
                {new:true}
            )
            return { success: true, message: "Unliked SuccessFull..!!!", }
        }
        comment.likes.push(userid)
        await comment.save();
        return { success: true, message: "leked SuccessFull..!!!", }
     }
}
// -----------------------------------------------------------
// async respondToRequest(req, res, next) {
//     try {
//         const userID = req.userID;
//         const friendId = req.params.friendId;
//         const response = req.body.response;
//         if (!userID) {
//             throw new ApplicationError("User id not received, please enter.", 404);
//         }
//         if (!friendId) {
//             throw new ApplicationError("Friend id not received, please enter.", 404);
//         }
//         const result = await this.friendRepository.respondToRequest(userID, friendId, response);
//         if (!result) {
//             throw new ApplicationError("Respond to request failed, something went wrong.", 404);
//         }
//         return res.status(200).json({
//             success: true,
//             msg: result.message
//         });
//     } catch (error) {
//         next(error);
//     }
// }
// --------------------------------------------------------------
 // Accept or reject a friend request.
//  async respondToRequest(userID, friendId, response) {
//     try {
//         // Find the friendship
//         let friendship = await FriendshipModel.findOne({ user: new ObjectId(friendId), friend: new ObjectId(userID), status: 'pending' });
//         if (friendship) {
//             // Update the status based on the response
//             friendship.status = response;
//             await friendship.save();
//             return { message: `Friend request ${response}.` };
//         } else {
//             throw new ApplicationError('Friend request not found', 404);
//         }
//     } catch (error) {
//         handleDatabaseError(error);
//     }
// }