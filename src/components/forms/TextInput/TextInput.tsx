import {
  TextInput as Input,
  TextInputProps as InputProps,
  MantineStyleSystemProps,
  CSSObject,
  TextInputStylesNames,
  MantineTheme,
} from "@mantine/core";
import { Controller, FieldValues, Path } from "react-hook-form";
import { HookFormControlled } from "types";

interface TextInputProps<TFieldValues>
  extends HookFormControlled<TFieldValues>,
    MantineStyleSystemProps {
  name: Path<TFieldValues>;
  label?: string;
  type?: InputProps["type"];
  variant?: InputProps["variant"];
  className?: string;
  styles?:
    | Partial<Record<TextInputStylesNames, CSSObject>>
    | ((
        theme: MantineTheme
      ) => Partial<Record<TextInputStylesNames, CSSObject>>);
}
export const TextInput = <TFieldValues extends FieldValues>({
  control,
  name,
  ...inputProps
}: TextInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          id={name}
          error={error?.message}
          {...field}
          {...inputProps}
        ></Input>
      )}
    />
  );
};
