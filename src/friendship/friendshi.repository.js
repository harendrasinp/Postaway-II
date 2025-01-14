import { friendsModel } from "./friendshi.schema.js";
import { signupModel } from "../user/user.repository.js";
export class friendshipRepository {
    async friendshipReq(UserId, FriendId) {
        // -----------------------------------suring not sent request to self--------------------------------
        if (UserId == FriendId) {
            return { success: false, message: "You Can Not send Request to Your self", code: 403 }
        }
        // ------------------------------checking is already Sent request to same user or not-------------------------------
        const isData = await friendsModel.findOne({ UserId: UserId, FriendId: FriendId });
        if (isData) {
            return { success: false, message: "You Already Sent A Friend Request to this Persone", code: 403 }
        }
        // -----------------------------------Sending new Request---------------------------------------------
        const friendshipData = {
            UserId: UserId,
            FriendId: FriendId,
            requestStatus: "pending"
        }
        const friendData = new friendsModel(friendshipData);
        await friendData.save();
        return { success: true, message: "Friend Request Sent Successfully !!!" }
    }

    // ------------------------------------------geting friend Requests------------------------------------------------
    async getfriendshipReq(userid) {
        const pendingData = await friendsModel.find({ UserId: userid, requestStatus: "pending" });
        if (!pendingData || pendingData.length == 0) {
            const pendingData = await friendsModel.find({ FriendId: userid, requestStatus: "pending" });
            if (!pendingData) {
                return { success: false, message: "there is no firend Request !!!",code:403 };
            }
            const Reqdata = pendingData.map(item => ({
                ...item._doc,
                UserId: item.FriendId,
                FriendId: item.UserId
            }))
            if(!Reqdata || Reqdata.length==0){
                return { success: false, message: "there is no firend Request !!!",code:403 };
            }
            return { success: true, message: " Pendding Friend Requests !!!", data: Reqdata };
        }
        return { success: true, message: " Pendding Friend Requests !!!", data: pendingData };
    }
    // -------------------------------------------accepting request or reject------------------------------------------------
    async requestAccept(userId, FriendId) {
            //------------------------------check if user and friend is present--------------------------- 
        const pendingData = await friendsModel.find({ UserId: userId, FriendId: FriendId });
        if (!pendingData || pendingData.length == 0) {
            const checkAuthenticateUser = await friendsModel.find({ UserId: FriendId, FriendId: userId });
            if (checkAuthenticateUser) {
                const pendingData = await friendsModel.findOne({ UserId: FriendId, FriendId: userId });
                if (pendingData) {
                    const acceptAction = await friendsModel.findOneAndUpdate(
                        { UserId: FriendId, FriendId: userId },
                        { requestStatus: "accepted" },
                        { new: true }
                    );
                    await signupModel.findByIdAndUpdate(
                        userId,
                        {$push:{friends:FriendId}},
                        {new:true}
                    );
                    await signupModel.findByIdAndUpdate(
                        FriendId,
                        {$push:{friends:userId}},
                        {new:true}
                    );
                    return { success: true, message: "Friend Request Accepted......", data: acceptAction }
                }
                return { success: false, message: "Your not able to accept this request......", code: 403 }
            }
        }
        return { success: false, message: "Your not able to accept this request......",code:403 }
    }

}

// async requestAccept(userId, FriendId) {
//     const pendingData = await friendsModel.find({ yourId: userId, FriendId: FriendId });
//     if (!pendingData || pendingData.length == 0) {
//         return { success: false, message: "There is No Any Friend Requerst from this ID", code: 403 }
//     }
//     const acceptData = await friendsModel.find({ yourId: userId, FriendId: FriendId, requestStatus: "accepted" });
//     console.log(acceptData);
//     if (acceptData && acceptData.length > 0) {
//         return { success: false, message: "You Both Are Already Friends......", code: 403 }
//     }
//     const checkAuthenticateUser = await friendsModel.find({ yourId: userId, FriendId: FriendId });
//     if (checkAuthenticateUser) {
//         return { success: false, message: "Your not able to accept this request......", code: 403 }
//     }
//     const acceptAction = await friendsModel.findOneAndUpdate(
//         { yourId: userId, FriendId: FriendId },
//         { requestStatus: "accepted" },
//         { new: true }
//     );
//     return { success: true, message: "Friend Request Accepted......", data: acceptAction }
// }