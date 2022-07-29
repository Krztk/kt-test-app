import { ActionIcon, Box, Checkbox, createStyles } from "@mantine/core";
import { TextInput } from "components/forms";
import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFormTrigger,
} from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { QuestionFormInput } from "../QuestionForm";

interface ChoiceProps {
  index: number;
  control: Control<QuestionFormInput>;
  remove: UseFieldArrayRemove;
  trigger: UseFormTrigger<QuestionFormInput>;
}

const useStyles = createStyles((_theme, _params, _getRef) => ({
  wrapper: {
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "nowrap",
  },
  checkbox: {
    marginTop: "8px",
  },
}));

export const Choice = ({ index, control, remove, trigger }: ChoiceProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper} mb="sm">
      <Controller
        name={`choices.${index}.valid`}
        control={control}
        render={({ field: { value, onChange, ...checkboxProps } }) => (
          <Checkbox
            classNames={{ root: classes.checkbox }}
            checked={value}
            onChange={(e) => {
              onChange(e);
              trigger("choices");
            }}
            {...checkboxProps}
            mr="sm"
          />
        )}
      />
      <TextInput
        styles={{ root: { flexGrow: 1 } }}
        name={`choices.${index}.content`}
        control={control}
        mr="sm"
      />
      <ActionIcon
        size="lg"
        color="red"
        onClick={() => remove(index)}
        variant="filled"
        aria-label="remove category"
        data-testid="remove"
      >
        <BsTrash />
      </ActionIcon>
    </Box>
  );
};
