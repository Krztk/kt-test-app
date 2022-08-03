import { Title } from "@mantine/core";
import { QuestionDetails } from "../components/QuestionDetails/QuestionDetails";

export const Question = () => {
  return (
    <>
      <Title mb="md" order={2}>
        Question details
      </Title>
      <QuestionDetails />
    </>
  );
};
