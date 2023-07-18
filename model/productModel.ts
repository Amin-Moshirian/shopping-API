import { Schema, model } from "mongoose";

const productSchema: Schema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    brand: { type: String, require: true },
    color: { type: String, require: true },
    rating: { type: Number, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    image: { type: String, default: "http://localhost:3000/default/product-default.png"  },
},
    { timestamps: true }
);

const productModel: any = model("product", productSchema);
export default productModel;