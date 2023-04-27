import { NextFunction, Request, Response } from "express";
import shippingAddressValidaton from "./submitOrderSchema";
import { isValidObjectId } from "mongoose";
import productModel from "../model/productModel";

declare module 'express-serve-static-core' {
    interface Request {
        order: {
            orderItem: OrderItem;
            shippingAddress: ShippingAddress;
            paymentMethod: string;
            totalPrice: number;
            user: User;
        }
    }
};

type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: string;
    name: string;
    family: string;
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
};

type OrderItem = {
    product: {
        color: string[];
        countInStock: number;
        name: string;
        description: string;
        category: string;
        price: number;
        rating: number;
        brand: string;
        numReviews: string;
        images: string[];
        _id: string;
        deletedCount: number;
    };
    qty: number;
}[];


type ShippingAddress = {
    shippingAddress: {
        name: string;
        address: string;
        postalCode: string;
        city: string;
        phone: number;
    };
};


type Body = {
    orderItem: OrderItem;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
};


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
    numReviews: string;
};


const orderValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { orderItem, shippingAddress, paymentMethod }: Body = JSON.parse(JSON.stringify(req.body));
        await shippingAddressValidaton.validate(shippingAddress, { abortEarly: false });
        if (!["cash", "online"].includes(paymentMethod)) throw { message: "payment method is not allowed" };
        let totalPrice: number = 0
        for (const item of orderItem) {
            if (!isValidObjectId(item.product)) throw { message: "productId is not valid" };
            const prod: Product | null = await productModel.findOne({ _id: item.product }, { __v: 0, createdAt: 0, updatedAt: 0 });
            if (!prod) throw { message: "product not found" };
            item.product = prod;
            if (item.qty > prod.countInStock) throw { message: "product inventory is not enough" }
            totalPrice += item.qty * prod.price;
        };
        totalPrice += 5;
        const orderSubmitData: {
            orderItem: OrderItem;
            shippingAddress: ShippingAddress;
            paymentMethod: string;
            totalPrice: number;
            user: User;
        } = { orderItem, shippingAddress, paymentMethod, totalPrice, user: req.username };
        req.order = orderSubmitData;
        next();
    } catch (error: any) {
        next({ status: 400, message: error.message || error.errors });
    };
};

export default orderValidation;