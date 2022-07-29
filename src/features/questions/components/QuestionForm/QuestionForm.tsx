import { AnswerType, Choice, QuestionDTO } from "../../types";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { UseQueryResult } from "react-query";
import { TextInput, NumberInput, Select } from "components/forms";
import { mapToAddQuestionDto, mapToQuestionFormInput } from "./formInputMapper";
import { Button } from "@mantine/core";
import { CategorySelector, useCategories } from "features/categories";
import { Choices } from "./Choices/Choices";
import { useEffect } from "react";

const answerTypeEntries: AnswerType[] = [
  "Written",
  "Single choice",
  "Multiple choice",
];

interface QuestionFormProps {
  initialValuesQuery?: UseQueryResult<QuestionDTO, unknown>;
  onSubmit: (createQuestionDto: QuestionDTO) => Promise<void>;
  submitText: string;
}

export interface QuestionFormInput {
  content: string;
  answerType: AnswerType;
  writtenAnswerContent: string;
  choices: Choice[];
  score: number;
  categories: string[];
}

const initialValues: QuestionFormInput = {
  content: "",
  answerType: "Written",
  writtenAnswerContent: "",
  score: 1,
  choices: [
    { content: "", valid: false },
    { content: "", valid: false },
  ],
  categories: [],
};
export const QuestionForm = ({
  initialValuesQuery,
  onSubmit,
  submitText,
}: QuestionFormProps) => {
  const { handleSubmit, watch, control, formState, reset, trigger } =
    useForm<QuestionFormInput>({
      resolver: yupResolver(validationSchema),
      mode: "onSubmit",
      defaultValues: initialValues,
      shouldFocusError: false,
    });

  const fieldArrayContext = useFieldArray({
    control,
    name: "choices",
  });

  const isNewValueForm = initialValuesQuery === undefined;
  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data ?? [];

  useEffect(() => {
    if (
      initialValuesQuery === undefined ||
      !initialValuesQuery.isFetched ||
      !categoriesQuery.isFetched
    )
      return;

    const question = initialValuesQuery?.data;
    if (question === undefined) return;

    reset(mapToQuestionFormInput(question));
  }, [initialValuesQuery?.isFetched, categoriesQuery?.isFetched]);

  const onSubmitForm: SubmitHandler<QuestionFormInput> = async (data) => {
    await onSubmit(mapToAddQuestionDto(data));
    if (isNewValueForm) {
      const initialValuesWithLastSelectedAnswerType = {
        ...initialValues,
        answerType: data.answerType,
      };
      reset(initialValuesWithLastSelectedAnswerType);
    }
  };

  const answerType = watch("answerType");
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Select
        label="Answer type"
        control={control}
        name="answerType"
        data={answerTypeEntries}
        mb="sm"
      />
      <TextInput control={control} name="content" label="Question" mb="sm" />
      {answerType === "Written" && (
        <TextInput
          control={control}
          name="writtenAnswerContent"
          label="Answer"
        />
      )}

      {(answerType === "Single choice" || answerType === "Multiple choice") && (
        <Choices
          fieldArrayContext={fieldArrayContext}
          control={control}
          formState={formState}
          trigger={trigger}
          mb="sm"
        />
      )}

      <NumberInput
        name="score"
        label="Score"
        control={control}
        min={0.5}
        max={20}
        precision={1}
        step={0.5}
        mb="sm"
      />
      <CategorySelector
        name="categories"
        control={control}
        categories={categories}
      />
      <Button mt="md" loading={formState.isSubmitting} type="submit">
        {submitText}
      </Button>
    </form>
  );
};
