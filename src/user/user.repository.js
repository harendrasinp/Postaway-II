import mongoose from "mongoose";
import { signupSchema } from "./user.schema.js";
import { ApplicationError } from "../middlewares/ErrorHandling.js";
import { ObjectId } from "mongodb";

export const signupModel = mongoose.model("signup",signupSchema);

export class signupRepository {

    async signupRep(name, email, gender, password) {
            const checkMail = await signupModel.findOne({email});
            if (checkMail) {
                return { success: false, message: "Email Already registerd !!!", code: 409 }
            }
            const registrationObject = {
                name,
                email,
                gender,
                password,
            }
            const data = await new signupModel(registrationObject);
            await data.save();
            return { success: true, message: "Registration Successfull !!!", code: 201 }
    }
    // -------------------------------------Email Checking function for Login----------------------------
    async checkEmailForLogin(email) {
        try {
            const validEmail = await signupModel.findOne({ email });
            if (!validEmail) {
                return { success: false, message: "This Email is Not Registered !!!", code: 401 }
            }
            return { success: true, data: validEmail };
        } catch (err) {
            throw new ApplicationError("Something went Wrong from Server Side", 500);
        }

    }

    // ---------------------------------one use detail--------------------------------------
    async oneUserDetail(userID) {
        const userid = new ObjectId(userID);
        const userData = await signupModel.findById(userid, { name: 1, email: 1, gender: 1 });
        if (!userData) {
            return { success: false, message: "User Id not found...!!!", code: 403 }
        }
        return { success: true, message: userData }
    }
    // -----------------------------------all user Detail-----------------------------------------
    async allUserDetail() {
        return await signupModel.find({}, { name: 1, email: 1, gender: 1 });
    }

    // -----------------------------------update user detail--------------------------------------
    async updateUserDetail(userId, name, email, gender, password) {
        try {
            const data = await signupModel.findByIdAndUpdate(
                userId,
                { name,email,gender,password},
                { new:true,projection:{ name:1,email:1,gender:1} }
            );
            return { success: true, message: data }
        } catch (err) {
            console.log(err)
        }

    }
}