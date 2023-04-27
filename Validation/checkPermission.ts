import { NextFunction, Request, Response } from "express";
import userModel from "../model/userModel";

type User = {
    Role: string;
};

export const isOwnerAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = await userModel.findOne({ mobile: req.username });
        if (!["Admin", "Owner"].includes(user?.Role)) throw { status: 403, success: false, message: "Your client does not have permission to get URL" };
        next();
    } catch (error: unknown) {
        next(error)
    }
};

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = await userModel.findOne({ mobile: req.username });
        if (user?.Role != "Owner") throw { status: 403, success: false, message: "Your client does not have permission to get URL" };
        next();
    } catch (error: unknown) {
        next(error)
    }
};