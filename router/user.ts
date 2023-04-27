import { changePassword, changeProfile, deleteAccout, getProfile, getUser, getUsers, login, signUp, saveImage, logOut, getOtp, checkOtp } from "../controller/userController";
import { imageValidaton } from "../Validation/fileValidation";
import { Router } from "express";
import checkLogin from "../Validation/checkLogin";
import upload from "../modules/multer";
import user from "express";
import { isOwnerAdmin } from "../Validation/checkPermission";
const userRouter: Router = user.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.put("/logout", checkLogin, logOut);
userRouter.put("/change-profile", checkLogin, changeProfile);
userRouter.put("/change-password", checkLogin, changePassword);
userRouter.delete("/delete-account", checkLogin, deleteAccout);
userRouter.get("/get-profile", checkLogin, getProfile);
userRouter.post("/upload-avatar", checkLogin, upload.single('avatar'), imageValidaton, saveImage);
userRouter.get("/get-otp", getOtp);
userRouter.post("/check-otp", checkOtp);
userRouter.get("/:id", checkLogin, isOwnerAdmin, getUser);
userRouter.get("/", checkLogin, isOwnerAdmin, getUsers);

export default userRouter;