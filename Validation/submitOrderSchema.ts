import { string, object } from "yup"

const shippingAddressValidaton = object().shape({
    name:string().min(3),
    address: string().min(10).required(),
    postalCode: string().length(10).required(),
    city: string().min(3).required(),
    phone: string()
        .length(11)
        .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
        .required(),
});

export default shippingAddressValidaton;
