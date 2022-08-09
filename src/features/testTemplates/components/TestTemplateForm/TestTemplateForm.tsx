import { useDisclosure } from "@mantine/hooks";
import { usePagination } from "hooks/usePagination";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { QuestionHeaderDTO, useQuestionHeaders } from "features/questions";
import { useEffect, useState } from "react";
import { useCreateTestTemplate } from "../../api/createTestTemplate";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddTestTemplateDTO } from "features/testTemplates/types";
import { Box, Button, Modal } from "@mantine/core";
import { ErrorMessage, TextInput } from "components/forms";
import { Question } from "../Question/Question";
import { QuestionSelector } from "../QuestionSelector/QuestionSelector";

const initialData = {
  name: "",
  questionIds: [],
};

export const TestTemplateForm = () => {
  const { page, handleNextPage, handlePreviousPage } = usePagination();
  const [opened, handlers] = useDisclosure(false);
  const [selectedQuestionsModal, setSelectedQuestionsModal] = useState<
    QuestionHeaderDTO[]
  >([]);
  const [selectedQuestionsForm, setSelectedQuestionsForm] = useState<
    QuestionHeaderDTO[]
  >([]);

  const questionHeaderQuery = useQuestionHeaders({
    offset: 10 * page,
    limit: 10,
  });
  const testTemplateMutation = useCreateTestTemplate();

  const { handleSubmit, setValue, control, formState, reset } =
    useForm<AddTestTemplateDTO>({
      resolver: yupResolver(validationSchema),
      mode: "onSubmit",
      defaultValues: initialData,
      shouldFocusError: false,
    });

  useEffect(() => {
    setValue(
      "questionIds",
      selectedQuestionsForm.map((q) => q.id)
    );
  }, [selectedQuestionsForm, setValue]);

  const handleQuestionRemoval = (id: number) => {
    const filter = (questions: QuestionHeaderDTO[]) =>
      questions.filter((q) => q.id !== id);

    setSelectedQuestionsForm((currentValue) => filter(currentValue));
    setSelectedQuestionsModal((currentValue) => filter(currentValue));
  };

  const onSubmitForm: SubmitHandler<AddTestTemplateDTO> = async (data) => {
    await testTemplateMutation.mutateAsync(data);
    setSelectedQuestionsModal([]);
    setSelectedQuestionsForm([]);
    reset(initialData);
  };
  const questionHeaders = questionHeaderQuery?.data?.data ?? [];
  const lastPage = questionHeaderQuery.data?.lastPage ?? false;
  const { errors } = formState;
  const error =
    errors?.questionIds != undefined && !Array.isArray(errors.questionIds)
      ? (errors.questionIds as { message: string; type: string }).message
      : undefined;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <TextInput control={control} name="name" label="Name" />

        <p>Questions:</p>
        {selectedQuestionsForm.length > 0 && (
          <Box mt={2}>
            {selectedQuestionsForm.map((question) => (
              <Question
                key={question.id}
                data={question}
                onRemove={handleQuestionRemoval}
              />
            ))}
          </Box>
        )}
        {error && <ErrorMessage mb="sm" error={error} />}
        <Button mt="sm" onClick={handlers.open}>
          Add questions
        </Button>
        <Box mt="sm">
          <Button loading={testTemplateMutation.isLoading} mr={2} type="submit">
            Add a new Test Template
          </Button>
        </Box>
      </form>
      <Modal
        opened={opened}
        onClose={() => handlers.close()}
        overflow="inside"
        size="70%"
        title="Add questions to the test template"
      >
        {questionHeaderQuery.isFetched && (
          <>
            <QuestionSelector
              questionHeaders={questionHeaders}
              page={page}
              selectedQuestions={selectedQuestionsModal}
              setSelectedQuestions={setSelectedQuestionsModal}
              loading={questionHeaderQuery.isLoading}
              lastPage={lastPage}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePreviousPage}
            />
            <Button mr="sm" onClick={handlers.close}>
              Close
            </Button>
            <Button
              onClick={() => {
                setSelectedQuestionsForm(selectedQuestionsModal);
                handlers.close();
              }}
            >
              Add questions
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};
