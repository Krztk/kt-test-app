import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { CategoryDTO } from "../types";
import { categoryKeys } from "./categoryKeys";

export type UpdateCategoryDTO = {
  name: string;
};

interface UpdateCategoryData {
  data: UpdateCategoryDTO;
  categoryId: number;
}

export const updateCategory = ({
  data,
  categoryId,
}: UpdateCategoryData): Promise<void> => {
  return axios.put(`/categories/${categoryId}`, data);
};

type UseUpdateCategoryOptions = {
  config?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({
  config,
}: UseUpdateCategoryOptions = {}) => {
  return useMutation({
    onSuccess: (_, variables, __) => {
      const updatedCategory = {
        id: variables.categoryId,
        name: variables.data.name,
      };

      queryClient.setQueriesData<CategoryDTO[]>(
        categoryKeys.all,
        (previous) => {
          if (previous === undefined) {
            return [];
          }
          return previous.map((category) =>
            category.id === variables.categoryId ? updatedCategory : category
          );
        }
      );
    },
    ...config,
    mutationFn: updateCategory,
  });
};
