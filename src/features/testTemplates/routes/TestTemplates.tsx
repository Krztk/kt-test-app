import { Title } from "@mantine/core";
import { TestTemplateList } from "../components/TestTemplateList/TestTemplateList";

export const TestTemplates = () => {
  return (
    <>
      <Title mb="md" order={2}>
        Test Templates
      </Title>
      <TestTemplateList />
    </>
  );
};
