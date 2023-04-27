import { string, object } from "yup"

const passwordSchima = object().shape({
    newPassword: string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
    confirmNewPassword: string().required(),
});



export default passwordSchima;