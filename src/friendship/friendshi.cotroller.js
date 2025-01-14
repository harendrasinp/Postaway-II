import { friendshipRepository } from "./friendshi.repository.js";
import { ApplicationError } from "../middlewares/ErrorHandling.js";

export class friendshipController {
    constructor() {
        this.friendshipRepo = new friendshipRepository();
    }
    async FriendshipReq(req, res, next) {
        try {
            const userId = req.userid;
            const { friendId } = req.params;
            const friendshipStatus = await this.friendshipRepo.friendshipReq(userId, friendId);
            if (!friendshipStatus.success) {
                throw new ApplicationError(friendshipStatus.message, friendshipStatus.code);
            }
            res.status(200).send(friendshipStatus.message);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };

    async GetPendingFriendReq(req, res, next) {
        try {
            const userId = req.userid;
            const getPendingReqStatus = await this.friendshipRepo.getfriendshipReq(userId);
            if (!getPendingReqStatus.success) {
                throw new ApplicationError(getPendingReqStatus.message, getPendingReqStatus.come);
            }
            res.status(200).send({ message: getPendingReqStatus.message, Pending_Request: getPendingReqStatus.data });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }


    async AcceptRequest(req, res, next){
        try {
            const userId = req.userid;
            const { friendId } = req.params;
            const acceptStatus = await this.friendshipRepo.requestAccept(userId, friendId);
            if (!acceptStatus.success) {
                throw new ApplicationError(acceptStatus.message, acceptStatus.code);
            }
            res.status(200).send({message:acceptStatus.message,Request_Accepted_with:acceptStatus.data});
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

}