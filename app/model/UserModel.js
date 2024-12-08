import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
    {
        email : { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        firstName : { type: String},
        lastName : { type: String},
        phone : { type: String},
        img : { type: String},
        otp : { type: String}
    },
    {
        timestamps : true,
        versionKey : false,
    }
);


const UserModel = mongoose.model("users", DataSchema);

export default UserModel;