import { Title } from "@mantine/core";
import { useCreateQuestion } from "../api/createQuestion";
import { QuestionForm } from "../components/QuestionForm/QuestionForm";
import { QuestionDTO } from "../types";

export const AddQuestion = () => {
  const createQuestionMutation = useCreateQuestion();
  const onSubmit = async (createQuestionDto: QuestionDTO) => {
    await createQuestionMutation.mutateAsync(createQuestionDto, {});
  };
  return (
    <>
      <Title mb="md" order={2}>
        Add question
      </Title>
      <QuestionForm onSubmit={onSubmit} submitText={"Add a new question"} />
    </>
  );
};
