"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const signupSchima = (0, yup_1.object)().shape({
    username: (0, yup_1.string)().min(5).required(),
    email: (0, yup_1.string)()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .required(),
    password: (0, yup_1.string)()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required(),
    confirmPassword: (0, yup_1.string)(),
    mobile: (0, yup_1.string)()
        .length(11)
        .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
        .required(),
});
exports.default = signupSchima;
