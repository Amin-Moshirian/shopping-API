"use strict";
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
exports.setRole = exports.setAdmin = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const setAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const { Role } = req.body;
        const user = yield userModel_1.default.findOne({ _id });
        if ((user === null || user === void 0 ? void 0 : user.Role) === "Owner")
            throw { message: "you can set roll for this user" };
        if (!["Admin", "Restaurant", "User"].includes(Role))
            throw { message: "roll isn't correct" };
        yield userModel_1.default.updateOne({ _id }, { Role });
        res.status(200).json({ status: 200, success: true, message: "roll setted successfully" });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.setAdmin = setAdmin;
const setRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const { Role } = req.body;
        const user = yield userModel_1.default.findOne({ _id });
        if ((user === null || user === void 0 ? void 0 : user.Role) === "Owner" || (user === null || user === void 0 ? void 0 : user.Role) === "Admin")
            throw { message: "you can set roll for this user" };
        if (!["Restaurant", "User"].includes(Role))
            throw { message: "roll isn't correct" };
        yield userModel_1.default.updateOne({ _id }, { Role });
        res.status(200).json({ status: 200, success: true, message: "roll setted successfully" });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.setRole = setRole;
