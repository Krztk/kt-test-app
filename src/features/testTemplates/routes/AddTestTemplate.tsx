import { Title } from "@mantine/core";
import { TestTemplateForm } from "../components/TestTemplateForm/TestTemplateForm";

export const AddTestTemplate = () => {
  return (
    <>
      <Title mb="md" order={2}>
        Add a new test template
      </Title>
      <TestTemplateForm />
    </>
  );
};
