import { string, object } from "yup"

const loginSchima = object().shape({
  userName:
    string()
      .min(5)
      .required(),
  password: string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
});

export default loginSchima;
