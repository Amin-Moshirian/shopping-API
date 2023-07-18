import { number, object, string } from "yup";

const profileSchema = object().shape({
    firstName: string().min(2),
    lastName: string().min(2),
    age: number().min(10).max(100),
    city: string().min(2)
});

export default profileSchema;