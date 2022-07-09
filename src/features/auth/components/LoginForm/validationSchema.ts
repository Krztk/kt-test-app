import { object, string } from "yup";

export const validationSchema = object().shape({
  username: string().required(),
  password: string().required(),
});
