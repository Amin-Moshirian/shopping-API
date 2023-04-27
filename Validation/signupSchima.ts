import { string, object  } from "yup"

const signupSchima = object().shape({
  username: string().min(5).required(),
  email:
    string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
  password: string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  confirmPassword: string().required(),
  mobile: string()
    .length(11)
    .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
    .required(),
});
export default signupSchima;
