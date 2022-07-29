import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { QuestionDTO } from "../types";
import { questionKeys } from "./questionKeys";

export const createQuestion = (data: QuestionDTO): Promise<number> => {
  return axios.post("/questions", data);
};

type UseCreateQuestionOptions = {
  config?: MutationConfig<typeof createQuestion>;
};

export const useCreateQuestion = ({
  config,
}: UseCreateQuestionOptions = {}) => {
  return useMutation({
    onError: (_, __, context: any) => {
      if (context?.previousQuestions) {
        queryClient.setQueryData(questionKeys.all, context.previousQuestions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(questionKeys.all);
    },
    ...config,
    mutationFn: createQuestion,
  });
};
