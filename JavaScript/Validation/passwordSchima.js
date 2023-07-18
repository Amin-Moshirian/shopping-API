"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const passwordSchima = (0, yup_1.object)().shape({
    newPassword: (0, yup_1.string)()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must Minimum eight characters, at least one letter, one number and one special character.")
        .required()
});
exports.default = passwordSchima;
