"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const shippingAddressValidaton = (0, yup_1.object)().shape({
    // name:string().min(3),
    address: (0, yup_1.string)().min(10).required(),
    postalCode: (0, yup_1.string)().length(10).required(),
    city: (0, yup_1.string)().min(3).required(),
    phone: (0, yup_1.string)()
        .length(11)
        .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
        .required(),
});
exports.default = shippingAddressValidaton;
