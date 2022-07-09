import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required().max(32),
});