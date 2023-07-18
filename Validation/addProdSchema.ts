import { string, object, array, number } from "yup"

const addProdSchema = object().shape({
    name: string().min(3).required(),
    description: string().min(10).required(),
    category: string().min(2).required(),
    brand: string().min(2).required(),
    // color: array().of(string().min(3).required()).required(),
    color: string().min(3).required().required(),
    rating: number().min(1).max(5).required(),
    price: number().min(0).required(),
    countInStock: number().min(0).required()
});

export default addProdSchema;