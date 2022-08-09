import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";
import { useQuery } from "react-query";
import { Paginated } from "types";
import { TestTemplateHeaderDTO } from "../types";
import { testTemplateKeys } from "./testTemplateKeys";

export const getTestTemplates = (
  offset: number,
  limit: number
): Promise<Paginated<TestTemplateHeaderDTO>> => {
  return axios.get(`/TestTemplates?Offset=${offset}&Limit=${limit}`);
};

type QueryFnType = typeof getTestTemplates;
type UseTestTemplatesOptions = {
  offset: number;
  limit: number;
  config?: QueryConfig<QueryFnType>;
};

export const useTestTemplates = ({
  offset,
  limit,
  config,
}: UseTestTemplatesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: testTemplateKeys.paginated(offset, limit),
    queryFn: () => getTestTemplates(offset, limit),
    ...config,
  });
};
