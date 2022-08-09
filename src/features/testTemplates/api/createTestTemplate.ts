import { useMutation } from "react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { testTemplateKeys } from "./testTemplateKeys";
import { AddTestTemplateDTO } from "../types";

export const createTestTemplate = (
  data: AddTestTemplateDTO
): Promise<number> => {
  return axios.post("/testTemplates", data);
};

type UseCreateTestTemplateOptions = {
  config?: MutationConfig<typeof createTestTemplate>;
};

export const useCreateTestTemplate = ({
  config,
}: UseCreateTestTemplateOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(testTemplateKeys.all);
    },
    ...config,
    mutationFn: createTestTemplate,
  });
};
