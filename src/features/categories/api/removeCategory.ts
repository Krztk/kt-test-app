import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { categoryKeys } from "./categoryKeys";

export const removeCategory = ({
  categoryId,
}: {
  categoryId: number;
}): Promise<void> => {
  return axios.delete(`/categories/${categoryId}`);
};

type UseRemoveCategoryOptions = {
  config?: MutationConfig<typeof removeCategory>;
};

export const useRemoveCategory = ({
  config,
}: UseRemoveCategoryOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(categoryKeys.all);
    },
    ...config,
    mutationFn: removeCategory,
  });
};
