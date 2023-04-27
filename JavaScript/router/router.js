"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const order_1 = __importDefault(require("./order"));
const errorHandler_1 = require("../modules/errorHandler");
const express_1 = __importDefault(require("express"));
const role_1 = __importDefault(require("./role"));
const router = express_1.default.Router();
router.use("/user", user_1.default);
router.use("/product", product_1.default);
router.use("/order", order_1.default);
router.use("/role", role_1.default);
router.get("/", (req, res) => {
    res.send("Server is running");
});
router.use(errorHandler_1.notFound);
router.use(errorHandler_1.errorRes);
exports.default = router;
