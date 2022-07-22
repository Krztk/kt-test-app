import { useQuery } from "react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";
import { QuestionHeaderDTO } from "../types";
import { Paginated } from "types";
import { questionKeys } from "./questionKeys";

export const getQuestionHeaders = (
  offset: number,
  limit: number,
  categoryId: string | null
): Promise<Paginated<QuestionHeaderDTO>> => {
  const filterQueryParams = categoryId ? `&categoryId=${categoryId}` : "";
  return axios.get(
    `/questions/headers?Offset=${offset}&Limit=${limit}${filterQueryParams}`
  );
};

type QueryFnType = typeof getQuestionHeaders;
type UseQuestionHeadersOptions = {
  offset: number;
  limit: number;
  categoryId?: string | null;
  config?: QueryConfig<QueryFnType>;
};

export const useQuestionHeaders = ({
  offset,
  limit,
  categoryId = null,
  config,
}: UseQuestionHeadersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: questionKeys.paginated(offset, limit, categoryId),
    queryFn: () => getQuestionHeaders(offset, limit, categoryId),
    ...config,
  });
};
