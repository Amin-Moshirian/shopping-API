import { NextFunction, Request, Response } from "express";
import userModel from "../model/userModel";

export const setAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        const { Role }: { Role: string } = req.body;
        const user: { Role: string } = await userModel.findOne({ _id });
        if (user?.Role === "Owner") throw { message: "you can set roll for this user" };
        if (!["Admin", "Restaurant", "User"].includes(Role)) throw { message: "roll isn't correct" };
        await userModel.updateOne({ _id }, { Role });
        res.status(200).json({ status: 200, success: true, message: "roll setted successfully" });
    } catch (error: unknown) {
        next(error);
    };
};


export const setRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        const { Role } = req.body;
        const user: { Role: string } = await userModel.findOne({ _id });
        if (user?.Role === "Owner" || user?.Role === "Admin") throw { message: "you can set roll for this user" };
        if (!["Restaurant", "User"].includes(Role)) throw { message: "roll isn't correct" };
        await userModel.updateOne({ _id }, { Role });
        res.status(200).json({ status: 200, success: true, message: "roll setted successfully" });
    } catch (error: unknown) {
        next(error);
    };
};
