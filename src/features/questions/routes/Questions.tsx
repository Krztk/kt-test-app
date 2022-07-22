import { Title } from "@mantine/core";
import { QuestionList } from "../components/QuestionList/QuestionList";

export const Questions = () => {
  return (
    <>
      <Title mb="md" order={2}>
        Questions
      </Title>
      <QuestionList />
    </>
  );
};
