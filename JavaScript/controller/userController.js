"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOtp = exports.getOtp = exports.logOut = exports.saveImage = exports.getProfile = exports.deleteAccout = exports.getUser = exports.getUsers = exports.changeProfile = exports.changePassword = exports.login = exports.signUp = void 0;
const mongoose_1 = require("mongoose");
const randomstring_1 = __importDefault(require("randomstring"));
const yup = __importStar(require("yup"));
const userModel_1 = __importDefault(require("../model/userModel"));
const utils_1 = require("../modules/utils");
const loginSchima_1 = __importDefault(require("../Validation/loginSchima"));
const passwordSchima_1 = __importDefault(require("../Validation/passwordSchima"));
const signupSchima_1 = __importDefault(require("../Validation/signupSchima"));
;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword, mobile } = req.body;
        yield signupSchima_1.default.validate({ username, email, password, confirmPassword, mobile }, { abortEarly: false });
        if (password != confirmPassword)
            throw { message: "passwords are not match" };
        if (yield userModel_1.default.findOne({ $or: [{ username }, { email }, { mobile }] }))
            throw { message: "user already exist" };
        yield userModel_1.default.create({ username, email, password: (0, utils_1.hashString)(password), confirmPassword, mobile });
        res.status(201).json({ status: 201, success: true, message: "User created :)" });
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        yield loginSchima_1.default.validate({ userName, password });
        const user = yield userModel_1.default.findOne({ $or: [{ username: userName }, { email: userName }] }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (!user)
            throw { message: "email or password must wrong" };
        if (!(0, utils_1.compareHashedString)(password, user.password))
            throw { message: "email or password must wrong" };
        user.token = (0, utils_1.generateToken)(user.username);
        user.save();
        const userSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        res.json(userSend);
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
});
exports.login = login;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const user = yield userModel_1.default.findOne({ username: req.username }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (!user)
            throw { message: "user not found" };
        if (!(0, utils_1.compareHashedString)(oldPassword, user.password))
            throw { message: "old password is wrong" };
        if (newPassword != confirmNewPassword)
            throw { message: "passwords are not match" };
        yield passwordSchima_1.default.validate({ newPassword, confirmNewPassword });
        res.status(200).json({ status: 200, success: true, message: "password changed successfully" });
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
});
exports.changePassword = changePassword;
const changeProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, family, age, address } = req.body;
        const result = yield userModel_1.default.updateOne({ username: req.username }, { name, family, age, address });
        if (!result.modifiedCount)
            throw { message: "profile update failed" };
        res.status(200).json({ status: 200, success: true, message: "profile update successfully" });
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
});
exports.changeProfile = changeProfile;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next({ message: error.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw { message: "id isn't valid!" };
        const user = yield userModel_1.default.findOne({ _id: id });
        if (!user)
            throw { message: "user wasn't found" };
        res.status(200).json(user);
    }
    catch (error) {
        next({ message: error.message });
    }
});
exports.getUser = getUser;
const deleteAccout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userModel_1.default.deleteOne({ username: req.username });
        res.status(200).json(result);
    }
    catch (error) {
        next({ message: error.message });
    }
});
exports.deleteAccout = deleteAccout;
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ username: req.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, });
        if (!user)
            throw { message: "user not found" };
        res.status(200).json(user);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
});
exports.getProfile = getProfile;
const saveImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        const imagePath = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        const result = yield userModel_1.default.updateOne({ username: req.username }, { avatar: imagePath });
        res.status(200).json({ status: 200, success: true, message: "Image uploaded successfully" });
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
});
exports.saveImage = saveImage;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.updateOne({ username: req.username }, { token: "" });
        res.status(200).json({ status: 200, success: true, message: "user logged out" });
    }
    catch (error) {
        next();
    }
});
exports.logOut = logOut;
const getOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        yield yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile);
        if (!(yield userModel_1.default.findOne({ mobile })))
            throw { message: "mobile not found" };
        const value = randomstring_1.default.generate(5);
        yield userModel_1.default.updateOne({ mobile }, { OTP: { value, expireIn: Date.now() + 150000 } });
        res.status(200).json({ status: 200, success: true, message: "enter your OTP code" });
    }
    catch (error) {
        next({ status: 400, message: error.message || error.errors });
    }
});
exports.getOtp = getOtp;
const checkOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile, OTP } = req.body;
        yield yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile);
        const user = yield userModel_1.default.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 });
        if (!user)
            throw { message: "mobile not found" };
        if (Date.now() > user.OTP.expireIn)
            throw { message: "OTP code expired" };
        if (OTP.value !== user.OTP.value)
            throw { message: "OTP code is wrong" };
        user.token = (0, utils_1.generateToken)(user.username);
        user.save();
        const userSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        delete userSend.OTP;
        res.json(userSend);
    }
    catch (error) {
        next({ status: 400, message: error.message });
    }
});
exports.checkOtp = checkOtp;
