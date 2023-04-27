import userRouter from "./user";
import prodRouter from "./product"
import orderRouter from "./order";
import { Request, Response } from "express";
import { errorRes, notFound } from "../modules/errorHandler";
import { Router } from "express";
import rout from "express";
import roleRouter from "./role";
const router: Router = rout.Router();

router.use("/user", userRouter);
router.use("/product", prodRouter);
router.use("/order", orderRouter);
router.use("/role", roleRouter);
router.get("/",
    (req: Request, res: Response): void => {
        res.send("Server is running");
    });
router.use(notFound);
router.use(errorRes);

export default router;