import { CategoryDTO } from "../types";

export const mapToSelectEntry = (
  category: CategoryDTO
): { value: string; label: string } => {
  return { value: category.id.toString(), label: category.name };
};
