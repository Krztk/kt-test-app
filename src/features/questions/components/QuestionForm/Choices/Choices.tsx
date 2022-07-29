import {
  Box,
  Button,
  createStyles,
  Input,
  MantineStyleSystemProps,
} from "@mantine/core";
import { ErrorMessage } from "components/forms";
import {
  Control,
  FormState,
  UseFieldArrayReturn,
  UseFormTrigger,
} from "react-hook-form";
import { QuestionFormInput } from "../QuestionForm";
import { Choice } from "./Choice";

interface ChoicesProps extends MantineStyleSystemProps {
  fieldArrayContext: UseFieldArrayReturn<QuestionFormInput, "choices", "id">;
  control: Control<QuestionFormInput>;
  formState: FormState<QuestionFormInput>;
  trigger: UseFormTrigger<QuestionFormInput>;
}

const MAX_CHOICES = 8;

const useStyles = createStyles((_theme, _params, _getRef) => ({
  label: {
    display: "block",
    fontFamily: _theme.fontFamily,
  },
}));

export const Choices = ({
  fieldArrayContext,
  control,
  formState: { errors },
  trigger,
  ...mantineProps
}: ChoicesProps) => {
  const { fields, append, remove } = fieldArrayContext;
  const { classes } = useStyles();
  const choicesError =
    errors?.choices !== undefined && !Array.isArray(errors.choices)
      ? (errors.choices as { message: string; type: string }).message
      : null;

  return (
    <Box {...mantineProps}>
      <Input.Label classNames={{ label: classes.label }}>Choices</Input.Label>
      {fields.map((field, index) => (
        <Choice
          index={index}
          key={field.id}
          control={control}
          remove={remove}
          trigger={trigger}
        />
      ))}
      {choicesError && <ErrorMessage mb="sm" error={choicesError} />}

      <Button
        disabled={fields.length >= MAX_CHOICES}
        onClick={() => {
          append({ content: "", valid: false });
        }}
      >
        +++
      </Button>
    </Box>
  );
};
