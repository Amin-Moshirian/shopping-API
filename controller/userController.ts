import { Request, Response, NextFunction } from "express"
import { isValidObjectId } from "mongoose";
import randomString from "randomstring";
import * as yup from "yup";
import userModel from "../model/userModel";
import { compareHashedString, generateToken, hashString } from "../modules/utils";
import loginSchima from "../Validation/loginSchima";
import passwordSchima from "../Validation/passwordSchima";
import signupSchima from "../Validation/signupSchima";
import profileSchema from "../Validation/profileValidation";


type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: string;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    modifiedCount: number;
    token: string;
    userName: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    acknowledged: boolean;
    deletedCount: number;
    avatar: string;
    accept: string;
    host: string;
    connection: string;
    OTP: { value: string, expireIn: number };
    city: string;
    gender: string;
    save(): void;
};


type UserSend = {
    password?: string;
    OTP?: { value: string, expireIn: number };
}

type File = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
};

declare module 'express-serve-static-core' {
    interface Request {
        username: User
    }
};



export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password, mobile }: User =
            req.body;
        await signupSchima.validate({ username, email, password, mobile }, { abortEarly: false });
        if (await userModel.findOne({ $or: [{ username }, { email }, { mobile }] })) throw { message: "user already exist" }
        await userModel.create({ username, email, password: hashString(password), mobile })
        res.status(201).json({ status: 201, success: true, message: "User created :)" });
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message || error.errors });
    }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userName, password }: User = req.body;
        await loginSchima.validate({ userName, password });
        const user: User | null = await userModel.findOne({ $or: [{ username: userName }, { email: userName }] }, { "createdAt": 0, "updatedAt": 0, "__v": 0 })
        if (!user) throw { message: "email or password must wrong" }
        if (!compareHashedString(password, user.password)) throw { message: "email or password must wrong" }
        user.token = generateToken(user.username)
        user.save()
        const userSend: UserSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        res.json(userSend);
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message || error.errors });
    }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { oldPassword, newPassword }: User = req.body;
        const user: User | null = await userModel.findOne({ username: req.username }, { "createdAt": 0, "updatedAt": 0, "__v": 0 })
        if (!user) throw { message: "user not found" };
        if (!compareHashedString(oldPassword, user.password)) throw { message: "old password is wrong" };
        await passwordSchima.validate( {newPassword} );
        const result: User = await userModel.updateOne({ username: req.username }, { password: hashString(newPassword) })
        res.status(200).json({ status: 200, success: true, message: "password changed successfully" })
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message || error.errors });
    }
}

export const changeProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstName, lastName, age, city, gender }: User = req.body
        await profileSchema.validate({  firstName, lastName, age, city }, { abortEarly: false });
        if (!["male", "female"].includes(gender)) throw { status: 403, success: false, message: "Gender must be select between male or female" };
        const result: User = await userModel.updateOne({ username: req.username }, { firstName, lastName, age, city, gender })
        if (!result.modifiedCount) throw { message: "profile update failed" }
        res.status(200).json({ status: 200, success: true, message: "profile update successfully" })
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message || error.errors });
    }
}


export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: User[] | [] = await userModel.find()
        res.status(200).json(users)
    } catch (error: any) {
        next({ success:false, message: error.message });
    }
}


export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { message: "id isn't valid!" }
        const user: User | null = await userModel.findOne({ _id: id })
        if (!user) throw { message: "user wasn't found" }
        res.status(200).json(user)
    } catch (error: any) {
        next({ success:false, message: error.message });
    }
};


export const deleteAccout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: User | null = await userModel.deleteOne({ username: req.username })
        res.status(200).json(result);
    } catch (error: any) {
        next({ success:false, message: error.message });
    }
};


export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: User | null = await userModel.findOne({ username: req.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, });
        if (!user) throw { message: "user not found" };
        res.status(200).json(user)
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    }
};

export const saveImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const image: File = req.file;
        const imagePath: string = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        const result: User | null = await userModel.updateOne(
            { username: req.username },
            { avatar: imagePath }
        );
        res.status(200).json({ status: 200, success: true, message: "Image uploaded successfully" })
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    }
};

export const logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userModel.updateOne({ username: req.username }, { token: "" });
        res.status(200).json({ status: 200, success: true, message: "user logged out" })
    } catch (error: unknown) {
        next();
    }
};

export const getOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile }: User = req.body;
        await yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile);
        if (!await userModel.findOne({ mobile })) throw { message: "mobile not found" };
        const value: string = randomString.generate(5)
        await userModel.updateOne({ mobile }, { OTP: { value, expireIn: Date.now() + 150000 } });
        res.status(200).json({ status: 200, success: true, message: "enter your OTP code" })
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message || error.errors });
    }
};

export const checkOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mobile, OTP }: User = req.body;
        await yup.string().length(11).matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required().validate(mobile);
        const user: User = await userModel.findOne({ mobile }, { "createdAt": 0, "updatedAt": 0, "__v": 0 })
        if (!user) throw { message: "mobile not found" };
        if (Date.now() > user.OTP.expireIn) throw { message: "OTP code expired" };
        if (OTP.value !== user.OTP.value) throw { message: "OTP code is wrong" };
        user.token = generateToken(user.username)
        user.save()
        const userSend: UserSend = JSON.parse(JSON.stringify(user));
        delete userSend.password;
        delete userSend.OTP;
        res.json(userSend);
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    }
};
