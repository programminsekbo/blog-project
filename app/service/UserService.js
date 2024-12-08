import mongoose from "mongoose";
import md5 from "md5";
import UserModel from "../model/UserModel.js";
import { EncodeToken } from "../utility/TokenUtility.js";

const ObjectID = mongoose.Types.ObjectId;


// User Registration
export const registerService = async (req, res) => {
    try {
        let reqBody = req.body;
        let password = md5(reqBody.password);
        reqBody.password = password;
        let data = await UserModel.create(reqBody);
        return { status: 'Success', message: "User registered successfully", data: data };
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};


// User Login
export const LoginService = async (req) => {
    try {
        let {email, password } = req.body;
        password = md5(password);
        let code = Math.floor(100000 + Math.random() * 900000);
        let expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes


        let EmailText = `Your Verification Code is ${code}`;
        let EmailSubject = 'Email Verification';

        // try {
        //     await SendEmail(EmailSubject, EmailText);
        // } catch (emailError) {
        //     return { status: 'Fail', message: 'Failed to send email. Please try again later.' };
        // }

        let data = await UserModel.findOne({ email: email, password: password}).select('_id');
        console.log(data)

        if (data) {
            await UserModel.updateOne(
                { $set: { otp: code, otpExpiry: expiry } }
            );
            return {status : 'success', message : 'Your 6 Digit Code Has Been Send Successfully'};
        } else {
            return { status: 'Fail', message: 'Invalid information'};
        }

    } catch (e) {
        return {status : 'Fail', data : e.toString()};
    }
}

// Verify Login
export const VerifyLoginService = async (req) => {
    try {
        const { otp, email } = req.body;
        const user = await UserModel.findOne({ email: email, otp: otp }).select('_id');

        if (user) {
            const token = EncodeToken(email, user._id.toString());
            await UserModel.updateOne({ email: email }, { $set: { otp: null } });
            return { status: "success", message: "Valid OTP", token: token };
        } else {
            return { status: "fail", message: "Invalid OTP" };
        }
    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
};



// User profile Read
export const readProfileService = async (req, res) => {
    try {
        let email = req.headers.email;
        let MatchStage = {
            $match: {
                email,
            }
        };

        let project = {
            $project: {
                email: 1,
                firstName: 1,
                lastName: 1,
                img: 1,
                phone: 1,
            }
        }

        let data = await UserModel.aggregate([MatchStage, project]);
        return {status: 'Success', data: data[0]}
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};



// Verify Login



// User Profile Update
export const updateProfileService = async (req, res) => {
    try {
        let email = req.headers.email;
        let reqBody = req.body;
        let data = await UserModel.updateOne({ email }, reqBody);
        return { status: 'Success', message: "User profile updated successfully", data : data};
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};

