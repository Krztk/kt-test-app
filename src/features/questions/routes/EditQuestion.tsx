import { Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuestion } from "../api/getQuestion";
import { useUpdateQuestion } from "../api/updateQuestion";
import { QuestionForm } from "../components/QuestionForm/QuestionForm";
import { QuestionDTO } from "../types";

export const EditQuestion = () => {
  const { questionId } = useParams();
  const id = questionId ? Number.parseInt(questionId) : 0;
  const questionQuery = useQuestion({
    questionId: id,
  });

  const updateQuestionMutation = useUpdateQuestion();

  const onSubmit = async (questionDto: QuestionDTO) => {
    await updateQuestionMutation.mutateAsync({
      data: questionDto,
      questionId: id,
    });
  };
  return (
    <>
      <Title mb="md" order={2}>
        Edit question
      </Title>
      <QuestionForm
        initialValuesQuery={questionQuery}
        onSubmit={onSubmit}
        submitText={"Save"}
      />
    </>
  );
};
