import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { CategoryDTO } from "../types";
import { categoryKeys } from "./categoryKeys";

export type CreateCategoryDTO = {
  name: string;
};

export const createCategory = (data: CreateCategoryDTO): Promise<number> => {
  return axios.post("/categories", data);
};

type UseCreateCategoryOptions = {
  config?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({
  config,
}: UseCreateCategoryOptions = {}) => {
  return useMutation({
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries(categoryKeys.all);
      const previousCategories = queryClient.getQueryData<CategoryDTO[]>([
        "categories",
      ]);

      const newCategoryWithTemporaryId = {
        id: -1,
        name: newCategory.name,
      };

      queryClient.setQueryData(categoryKeys.all, [
        ...(previousCategories || []),
        newCategoryWithTemporaryId,
      ]);

      return { previousCategories };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(categoryKeys.all, context.previousCategories);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
    ...config,
    mutationFn: createCategory,
  });
};
