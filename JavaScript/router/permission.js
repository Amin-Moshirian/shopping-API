"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const permissionController_1 = require("../controller/permissionController");
const permissionRouter = express_1.default.Router();
permissionRouter.get("/", permissionController_1.getPermission);
permissionRouter.post("/add", permissionController_1.addPermission);
permissionRouter.delete("/remove/:_id", permissionController_1.removePermission);
exports.default = permissionRouter;
