import { string, object } from "yup"

const passwordSchima = object().shape({
    newPassword: string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must Minimum eight characters, at least one letter, one number and one special character.")
    .required()
});



export default passwordSchima;