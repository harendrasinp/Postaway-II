
import { ApplicationError, customeErrorhandleMiddlware } from "../middlewares/ErrorHandling.js";
import { signupRepository } from "./user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class userController {
    constructor() {
        this.signupRepository = new signupRepository();
    }
    async signupPost(req, res, next) {
        try {
            const { name, email, gender, password } = req.body;

            const validatestatus=await this.check(email,password);
            if(!validatestatus.success){
                throw new ApplicationError(validatestatus.message,validatestatus.code)
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const data = await this.signupRepository.signupRep(name, email, gender, hashPassword);
            if (data.success) {
                res.status(200).send(data.message);
            }
            else {
                throw new ApplicationError(data.message, data.code)
            }
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    //----------------------------------------check Email function----------------------------
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const validateEmailStatus = await this.signupRepository.checkEmailForLogin(email);
            if (!validateEmailStatus.success) {
                throw new ApplicationError(validateEmailStatus.message, validateEmailStatus.code);
            }
            const passwordMatchStatus = await bcrypt.compare(password, validateEmailStatus.data.password);
            if (passwordMatchStatus) {
                const token = jwt.sign({id:validateEmailStatus.data._id,name:validateEmailStatus.data.name,email:validateEmailStatus.data.email}, "Htz8oD9ize2fOzoF8rbxqXshKnw3zyMb", { expiresIn: "1h" })
                res
                    .cookie("authToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
                    .json({ message:"Login Successfull..!!!", Token_Generated: token });
            }
            else {
                throw new ApplicationError("Passoword Not Matched...!!!", 403);
            }
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    // --------------------------------logout function--------------------------------
    async logOut(req, res) {
        res.clearCookie("authToken").json({ success: true, msg: "logout successful" });
    }

    // ------------------------------ one user detail---------------------------
    async oneUserDetail(req, res, next) {
        try {
            const { userid } = req.params;
            const userDetail = await this.signupRepository.oneUserDetail(userid);
            if (!userDetail.success) {
                throw new ApplicationError(userDetail.message, userDetail.code);
            }
            res.status(200).send(userDetail.message)
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    // ----------------------------------------all user detail------------------------------
    async allUserData(req, res, next) {
        try {
            const usersDetail = await this.signupRepository.allUserDetail();
            if (!usersDetail) {
                throw new ApplicationError("data Not found", 401);
            }
            res.status(200).send(usersDetail);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    //--------------------------------------update user detail----------------------------
    async updateUserData(req, res, next) {
        try {
            const { userid } = req.params;
            const { name, email, gender, password } = req.body;

            const validatestatus=await this.check(email,password);
            if(!validatestatus.success){
                throw new ApplicationError(validatestatus.message,validatestatus.code)
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const updateStatus = await this.signupRepository.updateUserDetail(userid, name, email, gender, hashPassword);
            if (!updateStatus.success) {
                throw new ApplicationError(updateStatus.message, updateStatus.code)
            }
            res.status(200).send(updateStatus.message);
        } catch (err) {
            next(err);
        }
    }
// -------------------------------------------email and password Validate function--------------------------
    async check(email,password){
        const emailValidation=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        if(!emailValidation){
            return {success:false, message:"Incorect Email Formate",code:401}
        }
        const passwordValidation=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password);
        if(!passwordValidation){
            return {success:false, message:"Password must be 12  charecter and A-Z and a-z with any number",code:401}
        }
        return {success:true}
    }
}