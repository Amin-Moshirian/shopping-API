"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    family: { type: String },
    age: { type: Number },
    address: { type: String },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    mobile: { type: String, require: true },
    token: { type: String },
    Role: { type: [String], require: true, default: ["USER"] },
    avatar: { type: String, default: "http://localhost:3000/default/profileDefault.png" },
    OTP: { value: { type: String }, expireIn: { type: Number } }
}, { timestamps: true });
const userModel = (0, mongoose_1.model)("user", userSchema);
exports.default = userModel;
