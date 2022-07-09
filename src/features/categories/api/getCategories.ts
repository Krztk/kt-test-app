import { useQuery } from "react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";
import { CategoryDTO } from "../types";
import { categoryKeys } from "./categoryKeys";

export const getCategories = (): Promise<CategoryDTO[]> => {
  return axios.get(`/categories`);
};

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCategories = ({ config }: UseCategoriesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryKeys.all,
    queryFn: () => getCategories(),
    ...config,
  });
};
