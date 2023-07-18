import { NextFunction, Request, Response } from "express";
import productModel from "../model/productModel";
import addProdSchema from "../Validation/addProdSchema";
import { isValidObjectId } from "mongoose";


type Product = {
    _id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    color: string[];
    rating: number;
    price: number;
    countInStock: number;
    images: string[];
    deletedCount: number,
    length(): 0 | (() => number)
};


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
        files: any
    }
};


export const addProd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await addProdSchema.validate(req.body, { abortEarly: false });
        await productModel.create(req.body)
        res.status(201).json({ status: 201, success: true, message: "product created" });
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message || error.errors });
    }
};


export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products: Product[] | [] = await productModel.find({})
        if (!products.length) throw { success: false, message: "products not found" }
        res.status(200).json(products)
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    };
};


export const getOneProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.params.id;
        const product: Product | null = await productModel.findOne({ _id })
        if (!product) throw { success: false, message: "product not found" }
        res.status(200).json(product)
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    };
};


export const editProd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.params.id;
        for (const key in req.body) {
            if (!["name", "description", "category", "brand", "color", "rating", "price", "countInStock"].includes(key)) {
                throw { success: false, message: "edit product failed" }
            };
        };
        const result: Product | null = await productModel.updateOne({ _id }, req.body)
        res.status(200).json({ status: 200, success: true, message: "product updated" })
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    };
};


export const searchProd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const query = req.query;
        const result: [] | Product[] = await productModel.find(query);
        res.json(result)
    } catch (error: any) {
        next({ status: 400,success:false, message: error.message });
    };
};


export const deleteProd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.params.id;
        const result: Product | null = await productModel.deleteOne({ _id });
        if (result?.deletedCount == 0) throw { success: false, message: "product deleted failed" }
        res.status(200).json({ status: 200, success: true, message: "product deleted successfully" })
    } catch (error: any) {
        next({ status: 400, success:false, message: error.message });
    }
}


export const checkproductId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        if (!isValidObjectId(_id)) throw { message: "id isn't valid!" }
        if (!await productModel.findOne({ _id })) throw { message: "The product not found" };
        next();
    } catch (error: any) {
        next({ success:false, message: error.message });
    }
}


export const saveImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const image:File = req.file;
        const { _id } = req.params;
        const imagePath: string = req.protocol + "://" + req.get("host") + image.path.slice(17).replaceAll("\\", "/");
        await productModel.updateOne({ _id }, {image:imagePath})
        // const images: string[] = [];
        // for (const item of req.files) {
        //     console.log(item);
        //     images.push(req.protocol + "://" + req.get("host") + item.path.slice(17).replaceAll("\\", "/"));
        // };
        // await productModel.updateOne({ _id }, { $push: { images } })
        res.status(200).json({ success: true, message: "product images uploaded" })
    } catch (error: any) {
        next({ success:false, message: error.message });
    };
};
