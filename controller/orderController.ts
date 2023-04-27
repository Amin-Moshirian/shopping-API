import { NextFunction, Request, Response } from "express";
import orderModel from "../model/orderModel";
import { isValidObjectId } from "mongoose";


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
        image: string;
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
    shippingPrice: number;
    totalPrice: number;
    user: string;
    _id: string;
    createdAt: number,
    updatedAt: number;
    __v: number;
};

export const submitOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: Body = await orderModel.create(req.order);
        if (!result) throw { message: "try again" }
        res.status(201).json({ status: 201, success: true, message: "your order submited successfully" });
    } catch (error: any) {
        next({ status: 500, message: error.message });
    };
};

export const getOneOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { _id } = req.params;
        if (!isValidObjectId(_id)) throw { message: "orderId is not valid" };
        const result: Body[] | [] = await orderModel.find({ _id }, { user: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        if(!result.length) throw {message:"order not found"};
        res.status(200).json(result);
    } catch (error: any) {
        next({ status: 400, message: error.message});
    };
};


export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result: Body[] | [] = await orderModel.find({ user: req.username }, { user: 0, __v: 0, createdAt: 0, updatedAt: 0, shippingAddress: 0 });
        if(!result.length) throw {message:"no order submitted"};
        res.status(200).json(result);
    } catch (error: any) {
        next({ status: 400, message: error.message });
    };
};