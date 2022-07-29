import { useQuery } from "react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";
import { Question } from "../types";
import { questionKeys } from "./questionKeys";

export const getQuestion = (questionId: number): Promise<Question> => {
  return axios.get(`/questions/${questionId}`);
};

type QueryFnType = typeof getQuestion;

type UseQuestionOptions = {
  questionId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useQuestion = ({ questionId, config }: UseQuestionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: questionKeys.detail(questionId),
    queryFn: () => getQuestion(questionId),
  });
};
