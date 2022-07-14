import { isIterable } from "utils/iteratable";
import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string()
    .required()
    .max(32)
    .test(
      "no duplicates",
      "A category with that name already exist",
      (value, context) => {
        if (!value) return true;
        const valueLowerCase = value.trim().toLowerCase();
        const formContext = context.options.context;
        const categories = formContext?.categories;
        const oldValue = formContext?.oldValue;
        if (!isIterable(categories)) return true;
        for (const category of categories) {
          if (oldValue === valueLowerCase) return true;
          if (category === valueLowerCase) return false;
        }
        return true;
      }
    ),
});
