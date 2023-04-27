"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchima = new mongoose_1.Schema({
    name: { type: String },
    family: { type: String },
    age: { type: Number },
    address: { type: String },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    mobile: { type: String, require: true },
    token: { type: String },
    avatar: { type: String, default: "http://localhost:3000/default/profileDefault.png" }
}, { timestamps: true });
const userModel = (0, mongoose_1.model)("user", userSchima);
exports.default = userModel;
