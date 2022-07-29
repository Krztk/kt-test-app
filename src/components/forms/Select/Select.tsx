import {
  Select as MantineSelect,
  SelectProps as MantineSelectProps,
} from "@mantine/core";
import { Controller, FieldValues, Path } from "react-hook-form";
import { HookFormControlled } from "types";

interface SelectProps<TFieldValues>
  extends HookFormControlled<TFieldValues>,
    MantineSelectProps {
  name: Path<TFieldValues>;
}
export const Select = <TFieldValues extends FieldValues>({
  name,
  control,
  ...selectProps
}: SelectProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <MantineSelect error={error?.message} {...field} {...selectProps} />
        );
      }}
    />
  );
};
