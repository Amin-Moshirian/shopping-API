"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prodController_1 = require("../controller/prodController");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../modules/multer"));
const fileValidation_1 = require("../Validation/fileValidation");
const checkLogin_1 = __importDefault(require("../Validation/checkLogin"));
const prodRouter = express_1.default.Router();
prodRouter.post("/add-prod", prodController_1.addProd);
prodRouter.post("/upload-productImage/:_id", prodController_1.checkproductId, multer_1.default.array("prod-Images", 10), fileValidation_1.imagesValidaton, prodController_1.saveImage);
prodRouter.put("/edit-prod/:id", prodController_1.editProd);
prodRouter.get("/search", prodController_1.searchProd);
prodRouter.delete("/delete/:id", checkLogin_1.default, prodController_1.deleteProd);
prodRouter.get("/:id", prodController_1.getOneProduct);
prodRouter.get("/", prodController_1.getProducts);
exports.default = prodRouter;
