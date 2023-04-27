import { Router } from "express";
import { addProd, deleteProd, editProd, getOneProduct, getProducts, searchProd, saveImage, checkproductId } from "../controller/prodController";
import prod from "express"
import upload from "../modules/multer";
import { imagesValidaton } from "../Validation/fileValidation";
import checkLogin from "../Validation/checkLogin";
const prodRouter: Router = prod.Router();


prodRouter.post("/add-prod", addProd);
prodRouter.post("/upload-productImage/:_id", checkproductId, upload.array("prod-Images", 10), imagesValidaton, saveImage);
prodRouter.put("/edit-prod/:id", editProd);
prodRouter.get("/search", searchProd);
prodRouter.delete("/delete/:id", checkLogin, deleteProd);
prodRouter.get("/:id", getOneProduct);
prodRouter.get("/", getProducts);


export default prodRouter;