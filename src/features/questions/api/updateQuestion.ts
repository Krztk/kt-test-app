import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { QuestionDTO, Question } from "../types";
import { questionKeys } from "./questionKeys";

interface UpdateQuestionData {
  data: QuestionDTO;
  questionId: number;
}

export const updateQuestion = ({
  data,
  questionId,
}: UpdateQuestionData): Promise<void> => {
  return axios.put(`/questions/${questionId}`, data);
};

type UseCreateQuestionOptions = {
  config?: MutationConfig<typeof updateQuestion>;
};

export const useUpdateQuestion = ({
  config,
}: UseCreateQuestionOptions = {}) => {
  return useMutation({
    onSuccess: (_, variables, __) => {
      const updatedQuestion = getExpectedQuestion(variables);
      queryClient.setQueryData<Question>(
        questionKeys.detail(variables.questionId),
        updatedQuestion
      );

      queryClient.invalidateQueries(questionKeys.all);
    },
    ...config,
    mutationFn: updateQuestion,
  });
};

const getExpectedQuestion = (data: UpdateQuestionData): Question => {
  return {
    id: data.questionId,
    categories: data.data.categories,
    content: data.data.content,
    answer: data.data.answer,
  };
};
