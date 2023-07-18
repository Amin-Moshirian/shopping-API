import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    gender: { type: String },
    city: { type: String },
    address: { type: String },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    mobile: { type: String, require: true },
    token: { type: String },
    Role: { type: [String], require: true, default:["USER"] },
    avatar: { type: String, default: "http://localhost:3000/default/profileDefault.png" },
    OTP: { value: { type: String }, expireIn: { type: Number } }
}, { timestamps: true });


const userModel: any = model("user", userSchema);
export default userModel;