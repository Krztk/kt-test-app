import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { questionKeys } from "./questionKeys";

export const deleteQuestion = ({ questionId }: { questionId: number }) => {
  return axios.delete(`/questions/${questionId}`);
};

type UseDeleteQuestionOptions = {
  config?: MutationConfig<typeof deleteQuestion>;
};

export const useDeleteQuestion = ({
  config,
}: UseDeleteQuestionOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(questionKeys.all);
    },
    ...config,
    mutationFn: deleteQuestion,
  });
};
