"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const profileSchema = (0, yup_1.object)().shape({
    firstName: (0, yup_1.string)().min(2),
    lastName: (0, yup_1.string)().min(2),
    age: (0, yup_1.number)().min(10).max(100),
    city: (0, yup_1.string)().min(2)
});
exports.default = profileSchema;
