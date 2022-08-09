import { array, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required().max(64),
  questionIds: array().required().min(1),
});
