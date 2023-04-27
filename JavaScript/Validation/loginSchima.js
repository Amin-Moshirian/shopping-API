"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const loginSchima = (0, yup_1.object)().shape({
    userName: (0, yup_1.string)()
        .min(5)
        .required(),
    password: (0, yup_1.string)()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required(),
});
exports.default = loginSchima;
