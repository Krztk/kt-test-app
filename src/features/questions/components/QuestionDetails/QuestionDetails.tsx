import { Box, Loader, Text } from "@mantine/core";
import { ArrayPresenter, FieldPresenter } from "components/common";
import { Categories } from "features/categories";
import { useQuestion } from "features/questions/api/getQuestion";
import { useParams } from "react-router-dom";
import { Choice } from "./Choice/Choice";

export const QuestionDetails = () => {
  const { questionId } = useParams();
  const id = questionId ? Number.parseInt(questionId) : 0;
  const questionQuery = useQuestion({
    questionId: id,
  });

  if (questionQuery.isLoading) return <Loader size="xl" />;
  if (questionQuery.isError || !questionQuery.data) return <Text>Error</Text>;

  const question = questionQuery.data;

  return (
    <Box>
      <FieldPresenter name="Question">
        <Text>{question.content}</Text>
      </FieldPresenter>
      {question.answer.type === "written" && (
        <FieldPresenter name="Answer">
          <Text>{question.answer.content}</Text>
        </FieldPresenter>
      )}
      {question.answer.type === "choice" && (
        <ArrayPresenter
          name="Choices"
          items={question.answer.choices}
          component={Choice}
        />
      )}
      <FieldPresenter name="Score">
        <Text>{question.answer.score}</Text>
      </FieldPresenter>
      <FieldPresenter name="Categories">
        <Categories categoryIds={question.categories} />
      </FieldPresenter>
    </Box>
  );
};
